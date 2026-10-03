import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ShoppingBag, Droplets, Sparkles, Leaf, FlaskConical, ShieldCheck, Timer, Lock, BadgeCheck, Truck, RotateCcw, Star, Plus, Minus, ChevronLeft, ChevronRight, MapPin, Banknote, Check, ArrowRight, Heart,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { buildLanding, trust } from '../data/landing';

const ICONS = { Droplets, Sparkles, Leaf, FlaskConical, ShieldCheck, Timer, Lock, BadgeCheck, Truck, RotateCcw };
const fmt = (n) => `৳${n.toLocaleString('en-US')}`;

/* Fades sections in once as they scroll into view. */
const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { el?.classList.add('is-visible'); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`} {...rest}>{children}</Tag>;
};

const Stars = ({ value, size = 'w-4 h-4' }) => (
  <span className="inline-flex" role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} aria-hidden="true" className={`${size} ${i <= Math.round(value) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
    ))}
  </span>
);

const SectionHead = ({ eyebrow, title, text }) => (
  <Reveal className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-3">{eyebrow}</p>
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-tight">{title}</h2>
    {text && <p className="mt-4 text-base md:text-lg text-textMain leading-relaxed">{text}</p>}
  </Reveal>
);

const QuantityPicker = ({ quantity, setQuantity }) => (
  <div className="inline-flex items-center border border-ink/20 rounded-full h-12 bg-white" role="group" aria-label="Quantity">
    <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="w-12 h-full flex items-center justify-center text-ink hover:text-gold disabled:opacity-40 rounded-l-full focus-visible:outline-2 focus-visible:outline-gold" disabled={quantity <= 1}>
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-8 text-center font-semibold text-ink tabular-nums" aria-live="polite">{quantity}</span>
    <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(Math.min(10, quantity + 1))}
      className="w-12 h-full flex items-center justify-center text-ink hover:text-gold disabled:opacity-40 rounded-r-full focus-visible:outline-2 focus-visible:outline-gold" disabled={quantity >= 10}>
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

/* ---------- Hero ---------- */
const Hero = ({ product, data, quantity, setQuantity, addToCart, buyNow }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wished = isWishlisted(product.id);
  const gallery = data.gallery;
  const [index, setIndex] = useState(0);
  const item = gallery[index] || gallery[0];
  const go = (d) => setIndex((index + d + gallery.length) % gallery.length);
  const zoomStyle = (g) => ({ transform: `scale(${g.scale || 1})`, transformOrigin: g.origin || '50% 50%' });
  const [zoom, setZoom] = useState(null);
  useEffect(() => setIndex(0), [product.id]);
  const onZoomMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
  <section id="top" className="bg-cream scroll-mt-28">
    <div className="container mx-auto px-4 py-5 md:py-12 grid md:grid-cols-2 lg:grid-cols-[5fr_6fr] gap-6 md:gap-8 lg:gap-14 items-start">
      <div className="order-1 min-w-0 w-full max-w-[560px] md:max-w-none mx-auto lg:max-w-[520px] lg:mx-0">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_70px_-30px_rgba(43,36,32,0.45)] aspect-[5/4] sm:aspect-square bg-sand cursor-zoom-in"
          onMouseMove={onZoomMove} onMouseLeave={() => setZoom(null)}>
          <img key={index} src={item.src} alt={item.alt} fetchPriority="high" width="1024" height="1024" draggable="false"
            style={zoom ? { transform: `scale(${(item.scale || 1) * 2.2})`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : zoomStyle(item)}
            className={`w-full h-full object-cover animate-[fadeIn_.4s_ease] ${zoom ? 'transition-transform duration-100 ease-out' : 'transition-transform duration-300 ease-out'}`} />
          {discount > 0 && <span className="absolute top-4 left-4 bg-gold text-white text-sm font-bold px-4 py-1.5 rounded-full shadow">Save {discount}%</span>}
          <button type="button" onClick={() => toggleWishlist(product)} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow transition-all hover:scale-110 ${wished ? 'bg-red-500 text-white' : 'bg-white text-ink'}`}>
            <Heart className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2" role="group" aria-label="Product photos">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="w-8 h-8 shrink-0 flex items-center justify-center text-ink/60 hover:text-gold"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar flex-1 py-1">
            {gallery.map((g, i) => (
              <button key={g.label} type="button" onClick={() => setIndex(i)} aria-label={`Show ${g.label}`} aria-current={i === index}
                className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${i === index ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                <img src={g.src} alt="" loading="lazy" style={zoomStyle(g)} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="w-8 h-8 shrink-0 flex items-center justify-center text-ink/60 hover:text-gold"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="order-2 pt-4 lg:pt-0">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">{product.brand} · {product.category}</p>
        <h1 className="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.15]">{product.title}</h1>
        <p className="mt-3 md:mt-5 text-base md:text-lg text-textMain leading-relaxed max-w-xl">
          Authentic {data.noun} from {product.brand}, loved by {product.reviews.toLocaleString('en-US')} customers across Bangladesh.
          Delivered to your door with Cash on Delivery and a 7-day return promise.
        </p>

        <ul className="mt-4 md:mt-6 space-y-2 md:space-y-2.5 text-ink text-[15px] md:text-base">
          {data.bullets.map((t) => (
            <li key={t} className="flex items-start gap-3"><Check className="w-5 h-5 text-sage mt-0.5 shrink-0" aria-hidden="true" />{t}</li>
          ))}
        </ul>

        <div className="mt-5 md:mt-8 flex items-end gap-x-3 gap-y-1 flex-wrap">
          <span className="font-serif text-4xl md:text-5xl font-bold text-ink">{fmt(product.price)}</span>
          {product.oldPrice && <>
            <span className="text-xl text-textMuted line-through mb-1.5" aria-label={`Original price ${fmt(product.oldPrice)}`}>{fmt(product.oldPrice)}</span>
            <span className="mb-2 text-sm font-semibold text-sage bg-sage/10 px-3 py-1 rounded-full">You save {fmt(product.oldPrice - product.price)}</span>
          </>}
        </div>
        <p className="mt-1 text-sm text-textMuted">In stock · Ships same day if ordered before 4 PM</p>

        <div className="mt-5 md:mt-8">
          <div className="flex items-center justify-between gap-4">
            <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
            <p className="text-sm text-textMuted">Total <span className="block sm:inline text-lg font-bold text-ink">{fmt(product.price * quantity)}</span></p>
          </div>
          <div id="buy-row" className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => addToCart(product, quantity)}
              className="h-12 sm:h-14 px-4 rounded-full border-2 border-ink text-ink font-semibold text-sm sm:text-base hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" /> Add to Cart
            </button>
            <button type="button" onClick={() => buyNow(product, quantity)}
              className="h-12 sm:h-14 px-4 rounded-full bg-ink text-white font-semibold text-sm sm:text-base hover:bg-goldDark transition-all hover:-translate-y-0.5 shadow-lg shadow-ink/20 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              Buy Now <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 sm:gap-3 text-center text-[11px] leading-tight sm:text-sm text-ink border-t border-sand pt-5 md:pt-6">
          <div className="flex flex-col items-center gap-1.5"><Banknote className="w-5 h-5 text-gold" aria-hidden="true" />Cash on delivery</div>
          <div className="flex flex-col items-center gap-1.5"><Truck className="w-5 h-5 text-gold" aria-hidden="true" />1-2 day Dhaka delivery</div>
          <div className="flex flex-col items-center gap-1.5"><RotateCcw className="w-5 h-5 text-gold" aria-hidden="true" />7-day returns</div>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ---------- Trust strip ---------- */
const TrustBadges = () => (
  <section aria-label="Our promises" className="bg-white border-y border-sand">
    <div className="container mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {trust.map((t, i) => {
        const Icon = ICONS[t.icon];
        return (
          <Reveal key={t.title} delay={i * 80} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-4">
            <span className="w-12 h-12 shrink-0 rounded-full bg-cream flex items-center justify-center text-gold"><Icon className="w-6 h-6" aria-hidden="true" /></span>
            <div>
              <h3 className="font-sans text-sm sm:text-base font-semibold text-ink">{t.title}</h3>
              <p className="text-xs sm:text-sm text-textMain mt-0.5 leading-snug">{t.text}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

/* ---------- Reviews ---------- */
const emptyForm = { name: '', place: '', rating: 0, title: '', text: '' };

const FieldError = ({ id, msg }) => (msg ? <p id={id} role="alert" className="mt-1 text-sm text-red-600">{msg}</p> : null);

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }); };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Please enter your name.';
    if (!form.rating) err.rating = 'Please choose a star rating.';
    if (!form.title.trim()) err.title = 'Please add a short headline.';
    if (form.text.trim().length < 15) err.text = 'Please write at least 15 characters.';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSubmit({ ...form, name: form.name.trim(), place: form.place.trim(), title: form.title.trim(), text: form.text.trim() });
  };

  const field = 'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-ink placeholder:text-textMuted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30';
  const shown = hover || form.rating;

  return (
    <form onSubmit={submit} noValidate id="review-form" className="bg-white rounded-3xl border border-gold/40 shadow-lg p-6 sm:p-8 mb-5 scroll-mt-20">
      <h3 className="font-serif text-3xl font-semibold text-ink">Write a review</h3>
      <p className="text-sm text-textMain mt-1">Tell other customers what you think of this product.</p>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">Your rating <span className="text-red-600">*</span></legend>
        <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label="Star rating" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={form.rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => { setForm({ ...form, rating: n }); setErrors({ ...errors, rating: undefined }); }} onMouseEnter={() => setHover(n)}
              className="p-1 rounded focus-visible:outline-2 focus-visible:outline-gold">
              <Star className={`w-8 h-8 transition-colors ${n <= shown ? 'fill-gold text-gold' : 'text-gray-300'}`} />
            </button>
          ))}
          <span className="ml-2 text-sm text-textMain">{['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][shown]}</span>
        </div>
        <FieldError msg={errors.rating} />
      </fieldset>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rv-name" className="text-sm font-semibold text-ink">Your name <span className="text-red-600">*</span></label>
          <input id="rv-name" value={form.name} onChange={set('name')} maxLength={50} autoComplete="name" placeholder="e.g. Nusrat Jahan"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'rv-name-err' : undefined} className={`${field} mt-1.5`} />
          <FieldError id="rv-name-err" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="rv-place" className="text-sm font-semibold text-ink">City <span className="text-textMuted font-normal">(optional)</span></label>
          <input id="rv-place" value={form.place} onChange={set('place')} maxLength={40} autoComplete="address-level2" placeholder="e.g. Dhaka" className={`${field} mt-1.5`} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="rv-title" className="text-sm font-semibold text-ink">Review headline <span className="text-red-600">*</span></label>
        <input id="rv-title" value={form.title} onChange={set('title')} maxLength={80} placeholder="Summarise your experience"
          aria-invalid={!!errors.title} aria-describedby={errors.title ? 'rv-title-err' : undefined} className={`${field} mt-1.5`} />
        <FieldError id="rv-title-err" msg={errors.title} />
      </div>

      <div className="mt-4">
        <label htmlFor="rv-text" className="text-sm font-semibold text-ink">Your review <span className="text-red-600">*</span></label>
        <textarea id="rv-text" value={form.text} onChange={set('text')} rows={5} maxLength={1000} placeholder="What did you like or dislike? How did you use it?"
          aria-invalid={!!errors.text} aria-describedby={errors.text ? 'rv-text-err' : undefined} className={`${field} mt-1.5 resize-y`} />
        <div className="flex justify-between"><FieldError id="rv-text-err" msg={errors.text} /><span className="ml-auto text-xs text-textMuted">{form.text.length}/1000</span></div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="h-12 px-8 rounded-full bg-ink text-white font-semibold hover:bg-goldDark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Submit review</button>
        <button type="button" onClick={onCancel} className="h-12 px-6 rounded-full border border-ink/20 text-ink font-semibold hover:bg-sand transition-colors">Cancel</button>
      </div>
    </form>
  );
};

const REVIEWS_PER_PAGE = 6;

const Reviews = ({ productId, data }) => {
  const storageKey = `gsbd-reviews-${productId}`;
  const [mine, setMine] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    try { setMine(JSON.parse(localStorage.getItem(storageKey)) || []); } catch { setMine([]); }
    setFormOpen(false);
    setThanks(false);
  }, [storageKey]);

  const addReview = (r) => {
    const review = { ...r, rating: Number(r.rating), tag: 'Customer review', own: true, date: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }) };
    const next = [review, ...mine];
    setMine(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* storage unavailable: the review stays for this visit only */ }
    setFormOpen(false);
    setThanks(true);
    setPage(1);
  };

  const openForm = () => {
    setFormOpen(true);
    setThanks(false);
    setTimeout(() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };

  const base = data.stats;
  const total = base.total + mine.length;
  const average = Math.round(((Number(base.average) * base.total + mine.reduce((a, r) => a + r.rating, 0)) / total) * 10) / 10;
  const distribution = base.distribution.map((d) => ({ ...d, count: d.count + mine.filter((r) => r.rating === d.stars).length }));
  const allReviews = [...mine, ...data.reviews];
  const pageCount = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const reviews = allReviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);
  const goToPage = (n) => {
    setPage(n);
    document.getElementById('review-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="reviews" className="scroll-mt-14 py-12 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <SectionHead eyebrow="Customer reviews" title={`Loved by ${total.toLocaleString('en-US')} customers`} />
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
          <Reveal className="bg-white rounded-3xl border border-sand p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="flex items-end gap-3">
              <span className="font-serif text-6xl font-bold text-ink leading-none">{average.toFixed(1)}</span>
              <span className="text-textMuted mb-1">out of 5</span>
            </div>
            <div className="mt-2 flex items-center gap-2"><Stars value={average} /><span className="text-sm text-textMain">{total.toLocaleString('en-US')} reviews</span></div>
            <ul className="mt-6 space-y-2.5">
              {distribution.map((d) => (
                <li key={d.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 whitespace-nowrap text-ink font-medium">{d.stars} star</span>
                  <span className="flex-1 h-2.5 rounded-full bg-sand overflow-hidden"><span className="block h-full bg-gold rounded-full" style={{ width: `${(d.count / total) * 100}%` }} /></span>
                  <span className="w-10 text-right text-textMuted tabular-nums">{d.count}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={openForm}
              className="mt-7 w-full h-12 rounded-full bg-ink text-white font-semibold hover:bg-goldDark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              Write a review
            </button>
            <p className="mt-4 text-sm text-textMain flex items-start gap-2"><BadgeCheck className="w-5 h-5 text-sage shrink-0" aria-hidden="true" />Bought this product? Share your experience to help other shoppers.</p>
          </Reveal>

          <div>
            {thanks && (
              <div role="status" className="mb-5 rounded-2xl bg-sage/10 border border-sage/30 text-ink px-5 py-4 flex items-start gap-3">
                <Check className="w-5 h-5 text-sage mt-0.5 shrink-0" aria-hidden="true" />
                <p><strong>Thank you!</strong> Your review has been added below.</p>
              </div>
            )}
            {formOpen && <ReviewForm onSubmit={addReview} onCancel={() => setFormOpen(false)} />}
            <div id="review-list" className="grid sm:grid-cols-2 gap-5 scroll-mt-20">
              {reviews.map((r, i) => (
                <Reveal as="article" key={`${page}-${r.own ? 'own' : 'seed'}-${r.name}-${i}`} delay={(i % 2) * 90} className={`bg-white rounded-3xl border p-6 flex flex-col ${r.own ? 'border-gold/50' : 'border-sand'}`}>
                  <div className="flex items-center justify-between"><Stars value={r.rating} /><span className="text-xs text-textMuted">{r.date}</span></div>
                  <h3 className="mt-3 font-sans text-base font-semibold text-ink">{r.title}</h3>
                  <p className="mt-2 text-textMain leading-relaxed flex-1 break-words">{r.text}</p>
                  <footer className="mt-5 pt-4 border-t border-sand flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-sand text-goldDark font-bold flex items-center justify-center" aria-hidden="true">{r.name[0].toUpperCase()}</span>
                    <div className="leading-tight min-w-0">
                      <p className="text-sm font-semibold text-ink flex items-center gap-1.5">{r.name}{!r.own && <BadgeCheck className="w-4 h-4 text-sage" aria-label="Verified buyer" />}</p>
                      <p className="text-xs text-textMuted">{r.own ? `${r.place ? `${r.place} · ` : ''}Your review` : `${r.place} · ${r.tag}`}</p>
                    </div>
                  </footer>
                </Reveal>
              ))}
            </div>
            {pageCount > 1 && (
              <nav aria-label="Review pages" className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page"
                  className="h-11 px-4 rounded-full border border-ink/20 text-ink font-medium hover:bg-sand disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1"><ChevronLeft className="w-4 h-4" />Prev</button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button key={n} type="button" onClick={() => goToPage(n)} aria-label={`Page ${n}`} aria-current={n === page ? 'page' : undefined}
                    className={`w-11 h-11 rounded-full font-semibold transition-colors ${n === page ? 'bg-ink text-white' : 'border border-ink/20 text-ink hover:bg-sand'}`}>{n}</button>
                ))}
                <button type="button" onClick={() => goToPage(page + 1)} disabled={page === pageCount} aria-label="Next page"
                  className="h-11 px-4 rounded-full border border-ink/20 text-ink font-medium hover:bg-sand disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1">Next<ChevronRight className="w-4 h-4" /></button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Delivery ---------- */
const Delivery = () => (
  <section id="delivery" className="scroll-mt-14 py-16 md:py-20 bg-ink text-cream">
    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
      {[
        { icon: Truck, title: 'Inside Dhaka', text: '1-2 working days · ৳60 delivery charge' },
        { icon: MapPin, title: 'Outside Dhaka', text: '3-5 working days · ৳120 delivery charge' },
        { icon: Banknote, title: 'Pay your way', text: 'Cash on Delivery or bKash. Order confirmation by call and SMS.' },
      ].map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 90} className="flex gap-4">
          <span className="w-12 h-12 shrink-0 rounded-full bg-white/10 text-gold flex items-center justify-center"><Icon className="w-6 h-6" aria-hidden="true" /></span>
          <div><h3 className="font-serif text-2xl text-white">{title}</h3><p className="text-cream/80 mt-1">{text}</p></div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------- Mobile sticky buy bar ---------- */
const StickyBar = ({ product, visible, addToCart, buyNow, quantity }) => (
  <div className={`fixed bottom-16 inset-x-0 z-40 md:hidden bg-white border-t border-sand shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2 transition-all duration-300 ${visible ? 'translate-y-0' : 'translate-y-full opacity-0 pointer-events-none'}`}
    aria-hidden={!visible}>
    <div className="leading-tight mr-1">
      <p className="text-xl font-bold text-ink">{fmt(product.price)}</p>
      {product.oldPrice && <p className="text-xs text-textMuted line-through">{fmt(product.oldPrice)}</p>}
    </div>
    <button type="button" tabIndex={visible ? 0 : -1} onClick={() => addToCart(product, quantity)} aria-label="Add to cart"
      className="h-11 w-11 shrink-0 rounded-full border-2 border-ink text-ink flex items-center justify-center"><ShoppingBag className="w-5 h-5" /></button>
    <button type="button" tabIndex={visible ? 0 : -1} onClick={() => buyNow(product, quantity)}
      className="flex-1 h-11 rounded-full bg-ink text-white font-semibold hover:bg-goldDark transition-colors">Buy Now</button>
  </div>
);

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, buyNow } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);

  // Fall back to the first product if the id is unknown, as the previous page did.
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const data = useMemo(() => buildLanding(product), [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [product.id]);

  useEffect(() => {
    const onScroll = () => {
      const row = document.getElementById('buy-row');
      setShowSticky(!!row && row.getBoundingClientRect().bottom < 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-white">
      <nav aria-label="Breadcrumb" className="bg-cream border-b border-sand text-sm text-textMuted">
        <ol className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <li><Link to="/" className="hover:text-gold">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
          <li><Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-gold">{product.category}</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-4 h-4" /></li>
          <li aria-current="page" className="text-ink font-medium">{product.title}</li>
        </ol>
      </nav>
      <Hero product={product} data={data} quantity={quantity} setQuantity={setQuantity} addToCart={addToCart} buyNow={buyNow} />
      <TrustBadges />
      <Reviews productId={product.id} data={data} />
      <Delivery />
      <StickyBar product={product} visible={showSticky} addToCart={addToCart} buyNow={buyNow} quantity={quantity} />
    </div>
  );
};

export default ProductDetailsPage;
