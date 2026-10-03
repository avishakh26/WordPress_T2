/* Skino theme behaviour: cart drawer, wishlist, search suggestions, sliders, gallery. Vanilla JS, no build step. */
(function () {
	'use strict';

	var $ = function (sel, root) { return (root || document).querySelector(sel); };
	var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
	var cfg = window.SKINO || {};

	function post(action, data) {
		var body = new URLSearchParams(Object.assign({ action: action, nonce: cfg.nonce }, data || {}));
		return fetch(cfg.ajax, { method: 'POST', credentials: 'same-origin', body: body }).then(function (r) { return r.json(); });
	}
	function get(action, data) {
		var qs = new URLSearchParams(Object.assign({ action: action }, data || {}));
		return fetch(cfg.ajax + '?' + qs.toString(), { credentials: 'same-origin' }).then(function (r) { return r.json(); });
	}

	/* ------------------------------------------------------------ mobile menu + accordions */
	var menu = $('[data-mobile-menu]');
	function setMenu(open) {
		if (!menu) return;
		menu.classList.toggle('max-h-[80vh]', open);
		menu.classList.toggle('opacity-100', open);
		menu.classList.toggle('max-h-0', !open);
		menu.classList.toggle('opacity-0', !open);
		$$('[data-mobile-menu-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
	}
	$$('[data-mobile-menu-toggle]').forEach(function (b) {
		b.addEventListener('click', function () {
			setMenu(menu.classList.contains('max-h-0'));
			if (b.closest('nav')) window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	});
	$$('[data-accordion]').forEach(function (acc) {
		var btn = $('[data-accordion-toggle]', acc);
		var panel = $('[data-accordion-panel]', acc);
		btn.addEventListener('click', function () {
			var open = panel.classList.contains('max-h-0');
			$$('[data-accordion]').forEach(function (other) {
				var p = $('[data-accordion-panel]', other);
				p.classList.add('max-h-0', 'opacity-0');
				p.classList.remove('max-h-40', 'opacity-100');
				$('svg', other).classList.remove('rotate-180');
			});
			if (open) {
				panel.classList.remove('max-h-0', 'opacity-0');
				panel.classList.add('max-h-40', 'opacity-100');
				$('svg', acc).classList.add('rotate-180');
			}
		});
	});

	/* ------------------------------------------------------------ cart drawer */
	var drawer = $('[data-cart-drawer]');
	var overlay = $('[data-cart-overlay]');
	function openCart() {
		if (!drawer) return;
		overlay.classList.remove('hidden');
		drawer.classList.remove('translate-x-full');
		document.body.style.overflow = 'hidden';
	}
	function closeCart() {
		if (!drawer) return;
		overlay.classList.add('hidden');
		drawer.classList.add('translate-x-full');
		document.body.style.overflow = '';
	}
	function renderCart(res) {
		if (!res || !res.success) return;
		$('#cart-drawer-inner').innerHTML = res.data.html;
		$$('[data-cart-count]').forEach(function (el) { el.textContent = res.data.count; });
	}
	document.addEventListener('click', function (e) {
		var t = e.target;
		if (t.closest('[data-cart-open]')) { e.preventDefault(); openCart(); return; }
		if (t.closest('[data-cart-close]') || t === overlay) { closeCart(); return; }

		var add = t.closest('[data-add-to-cart]');
		if (add) {
			e.preventDefault();
			var qty = 1;
			if (add.dataset.qtyFrom) {
				var box = $(add.dataset.qtyFrom);
				if (box && box.dataset.qty) qty = parseInt(box.dataset.qty, 10) || 1;
			}
			var buyNow = !!add.dataset.buyNow;
			add.disabled = true;
			post('skino_cart_add', { product_id: add.dataset.addToCart, quantity: qty, buy_now: buyNow ? 1 : '' })
				.then(function (res) {
					add.disabled = false;
					if (!res.success) { window.alert((res.data && res.data.message) || 'Could not add to cart'); return; }
					renderCart(res);
					if (buyNow && cfg.checkout) { window.location.href = cfg.checkout; } else { openCart(); }
				})
				.catch(function () { add.disabled = false; });
			return;
		}

		var step = t.closest('[data-cart-qty]');
		var rm = t.closest('[data-cart-remove]');
		if (step || rm) {
			var line = t.closest('[data-cart-key]');
			var current = parseInt($('[data-qty]', line).dataset.qty, 10);
			var next = rm ? 0 : current + parseInt(step.dataset.cartQty, 10);
			post('skino_cart_update', { key: line.dataset.cartKey, quantity: Math.max(0, next) }).then(renderCart);
		}
	});
	document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeCart(); closeFilter(); } });

	/* ------------------------------------------------------------ search suggestions */
	// One box for desktop, one for phones/tablets; each gets its own suggestion list.
	var esc = function (s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
	$$('[data-search]').forEach(function (sBox) {
		var input = $('[data-search-input]', sBox);
		var results = $('[data-search-results]', sBox);
		var timer;
		input.addEventListener('input', function () {
			clearTimeout(timer);
			var q = input.value.trim();
			if (q.length < 2) { results.classList.add('hidden'); return; }
			timer = setTimeout(function () {
				get('skino_search', { q: q }).then(function (res) {
					var list = (res && res.data) || [];
					if (!list.length) { results.classList.add('hidden'); return; }
					results.innerHTML = list.map(function (p) {
						return '<a href="' + esc(p.url) + '" class="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors">' +
							'<img src="' + esc(p.image) + '" alt="" class="w-10 h-10 object-contain rounded">' +
							'<div class="flex-1"><h4 class="text-sm font-medium text-gray-800 line-clamp-1">' + esc(p.title) + '</h4>' +
							'<div class="flex items-center gap-2 mt-0.5">' + (p.old ? '<span class="text-gray-400 line-through text-xs">' + esc(p.old) + '</span>' : '') +
							'<span class="text-primary font-bold text-sm">' + esc(p.price) + '</span></div></div></a>';
					}).join('');
					results.classList.remove('hidden');
				});
			}, 250);
		});
		document.addEventListener('click', function (e) { if (!sBox.contains(e.target)) results.classList.add('hidden'); });
	});

	/* ------------------------------------------------------------ wishlist (kept in this browser) */
	var KEY = 'skino-wishlist';
	function wl() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (err) { return []; } }
	function saveWl(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (err) { /* storage unavailable */ } }
	function paintWishlist() {
		var list = wl();
		$$('[data-wishlist-id]').forEach(function (btn) {
			var on = list.indexOf(parseInt(btn.dataset.wishlistId, 10)) !== -1;
			btn.setAttribute('aria-pressed', on ? 'true' : 'false');
			btn.classList.toggle('is-wished', on);
			var svg = $('svg', btn);
			if (svg) svg.setAttribute('fill', on ? 'currentColor' : 'none');
			var label = $('[data-wishlist-label]', btn);
			if (label) label.textContent = on ? 'Remove' : 'Add to Wishlist';
		});
		$$('[data-wishlist-count]').forEach(function (el) {
			el.textContent = list.length;
			el.classList.toggle('hidden', !list.length);
			el.classList.toggle('flex', !!list.length);
		});
	}
	var grid = $('[data-wishlist-grid]');
	function loadWishlistPage() {
		if (!grid) return;
		var list = wl();
		var summary = $('[data-wishlist-summary]');
		var empty = $('[data-wishlist-empty]');
		summary.textContent = list.length + ' item' + (list.length === 1 ? '' : 's') + ' saved';
		empty.classList.toggle('hidden', list.length > 0);
		if (!list.length) { grid.innerHTML = ''; return; }
		get('skino_wishlist', { ids: list.join(',') }).then(function (res) {
			if (res && res.success) { grid.innerHTML = res.data.html; paintWishlist(); }
		});
	}
	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-wishlist-id]');
		if (!btn) return;
		e.preventDefault();
		var id = parseInt(btn.dataset.wishlistId, 10);
		var list = wl();
		var i = list.indexOf(id);
		if (i === -1) list.push(id); else list.splice(i, 1);
		saveWl(list);
		paintWishlist();
		if (grid && i !== -1) {
			var card = btn.closest('[data-product-card]');
			if (card) card.remove();
			var left = wl().length;
			$('[data-wishlist-summary]').textContent = left + ' item' + (left === 1 ? '' : 's') + ' saved';
			$('[data-wishlist-empty]').classList.toggle('hidden', left > 0);
		}
	});
	paintWishlist();
	loadWishlistPage();

	/* ------------------------------------------------------------ filter drawer (category / brand pages) */
	var fd = $('[data-filter-drawer]');
	function closeFilter() { if (fd) { fd.classList.add('hidden'); document.body.style.overflow = ''; } }
	if (fd) {
		$$('[data-filter-open]').forEach(function (b) { b.addEventListener('click', function () { fd.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }); });
		$$('[data-filter-close]', fd).forEach(function (b) { b.addEventListener('click', closeFilter); });
	}

	/* ------------------------------------------------------------ sliders */
	if (window.Swiper) {
		var hero = $('[data-hero-swiper]');
		if (hero) {
			new Swiper(hero, {
				loop: true, slidesPerView: 1, spaceBetween: 0,
				autoplay: { delay: 5000, disableOnInteraction: false },
				pagination: { el: $('.swiper-pagination', hero), clickable: true }
			});
		}

		var tabs = $('[data-product-tabs]');
		if (tabs) {
			var swipers = {};
			$$('[data-tab-panel]', tabs).forEach(function (panel) {
				swipers[panel.dataset.tabPanel] = new Swiper(panel, { slidesPerView: 2, spaceBetween: 0, breakpoints: { 768: { slidesPerView: 4 } } });
			});
			var active = 'best';
			$$('[data-tab]', tabs).forEach(function (btn) {
				btn.addEventListener('click', function () {
					active = btn.dataset.tab;
					$$('[data-tab]', tabs).forEach(function (b) { b.classList.toggle('is-active', b === btn); });
					$$('[data-tab-panel]', tabs).forEach(function (p) { p.classList.toggle('hidden', p.dataset.tabPanel !== active); });
					if (swipers[active]) swipers[active].update();
				});
			});
			$('[data-tab-prev]', tabs).addEventListener('click', function () { if (swipers[active]) swipers[active].slidePrev(); });
			$('[data-tab-next]', tabs).addEventListener('click', function () { if (swipers[active]) swipers[active].slideNext(); });
		}
	}

	/* ------------------------------------------------------------ product page */
	var buy = $('[data-buy-box]');
	if (buy) {
		var qty = 1;
		var price = parseFloat(buy.dataset.price) || 0;
		var out = $('[data-qty-value]', buy);
		var total = $('[data-total]', buy);
		var paint = function () {
			buy.dataset.qty = qty;
			out.textContent = qty;
			total.textContent = '৳' + (price * qty).toLocaleString('en-US');
			$$('[data-qty-step="-1"]', buy).forEach(function (b) { b.disabled = qty <= 1; });
			$$('[data-qty-step="1"]', buy).forEach(function (b) { b.disabled = qty >= 10; });
		};
		$$('[data-qty-step]', buy).forEach(function (b) {
			b.addEventListener('click', function () { qty = Math.max(1, Math.min(10, qty + parseInt(b.dataset.qtyStep, 10))); paint(); });
		});
		paint();

		var bar = $('[data-sticky-bar]');
		var row = $('#buy-row');
		if (bar && row) {
			var onScroll = function () {
				var show = row.getBoundingClientRect().bottom < 0;
				bar.classList.toggle('translate-y-full', !show);
				bar.classList.toggle('opacity-0', !show);
				bar.classList.toggle('pointer-events-none', !show);
				bar.setAttribute('aria-hidden', show ? 'false' : 'true');
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}
	}

	var gal = $('[data-gallery]');
	if (gal) {
		var thumbs = $$('[data-gallery-thumb]', gal);
		var main = $('[data-gallery-main]', gal);
		var stage = $('[data-gallery-stage]', gal);
		var idx = 0;
		var show = function (i) {
			if (!thumbs.length) return;
			idx = (i + thumbs.length) % thumbs.length;
			main.src = thumbs[idx].dataset.galleryThumb;
			thumbs.forEach(function (t, n) {
				t.classList.toggle('border-gold', n === idx);
				t.classList.toggle('border-transparent', n !== idx);
				t.classList.toggle('opacity-70', n !== idx);
			});
		};
		thumbs.forEach(function (t, n) { t.addEventListener('click', function () { show(n); }); });
		var prev = $('[data-gallery-prev]', gal), next = $('[data-gallery-next]', gal);
		if (prev) prev.addEventListener('click', function () { show(idx - 1); });
		if (next) next.addEventListener('click', function () { show(idx + 1); });
		stage.addEventListener('mousemove', function (e) {
			var r = stage.getBoundingClientRect();
			main.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
			main.style.transform = 'scale(2.2)';
		});
		stage.addEventListener('mouseleave', function () { main.style.transform = ''; });
	}

	/* ------------------------------------------------------------ login / sign up tabs */
	var auth = $('[data-auth]');
	if (auth) {
		var copy = {
			login: ['Welcome back', 'Log in to see your orders, addresses and wishlist.'],
			register: ['Create your account', 'Sign up in seconds to track orders and save your wishlist.']
		};
		var showAuth = function (name) {
			$$('[data-auth-panel]', auth).forEach(function (p) { p.hidden = p.dataset.authPanel !== name; });
			$$('.skino-auth-tabs [data-auth-tab]', auth).forEach(function (t) { t.setAttribute('aria-selected', t.dataset.authTab === name ? 'true' : 'false'); });
			$('[data-auth-title]', auth).textContent = copy[name][0];
			$('[data-auth-sub]', auth).textContent = copy[name][1];
		};
		auth.addEventListener('click', function (e) {
			var t = e.target.closest('[data-auth-tab]');
			if (t) showAuth(t.dataset.authTab);
		});
		showAuth(location.hash === '#register' && $('[data-auth-panel="register"]', auth) ? 'register' : auth.dataset.start);
	}

	/* ------------------------------------------------------------ scroll reveal */
	var reveals = $$('.reveal');
	if (reveals.length) {
		if (!('IntersectionObserver' in window)) { reveals.forEach(function (el) { el.classList.add('is-visible'); }); }
		else {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
			}, { threshold: 0.12 });
			reveals.forEach(function (el) { io.observe(el); });
		}
	}
})();
