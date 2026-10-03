<?php
/**
 * Home page (ported from HomePage.jsx).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();

$heroes = array(
	array( 'hero2.jpg', 'Premium skincare collection' ),
	array( 'hero3.jpg', 'Premium cosmetics' ),
	array( 'hero4.jpg', 'Luxury fragrances' ),
);

$categories = array(
	array( 'Skin Care', 'cat_skincare.png' ),
	array( 'Makeup', 'cat_makeup.png' ),
	array( 'Hair Care', 'cat_haircare.png' ),
	array( 'Fragrance', 'cat_fragrance.png' ),
	array( 'Body Care', 'cat_bodycare.png' ),
	array( 'Accessories', 'cat_accessories.png' ),
);

$top_brands = array(
	array( 'Cosrx', 'Skin first, hype later', skino_asset( 'img/brand_cosrx.png' ) ),
	array( 'Centella', 'Pure centella, pure glow', skino_asset( 'img/brand_centella.png' ) ),
	array( 'Medicube', 'Clinic-level care, Everyday glow', skino_asset( 'img/brand_medicube.png' ) ),
	array( 'Anua', 'Calm skin, Clear glow', skino_asset( 'img/brand_anua.png' ) ),
	array( 'Sheglam', 'Bold, Affordable, High-Quality Beauty', skino_demo_image( 'makeup', 'Sheglam' ) ),
	array( 'Nior', 'Elegance in Every Detail', skino_demo_image( 'makeup', 'Nior' ) ),
	array( 'Everly', 'Effortless Beauty, Everyday Glow', skino_demo_image( 'makeup', 'Everly' ) ),
	array( 'Swiss Beauty', 'Expecting Tomorrow', skino_demo_image( 'makeup', 'Swiss+Beauty' ) ),
);

$offers = array(
	array( 'url' => skino_category_url( 'Makeup' ), 'bg' => 'from-pink-500 to-rose-400', 'tag' => 'Flash Sale', 'tagc' => 'text-pink-500', 'title' => 'MARS Lips<br>That Wow!', 'text' => 'Up to 40% off all shades', 'cta' => 'Shop Now', 'img' => skino_demo_image( 'makeup', 'promo-1' ), 'shadow' => 'hover:shadow-[0_8px_25px_rgba(236,72,153,0.3)]' ),
	array( 'url' => skino_category_url( 'Skin Care' ), 'bg' => 'from-amber-400 to-orange-400', 'tag' => 'Special Offer', 'tagc' => 'text-orange-500', 'title' => 'Dot &amp; Key<br>Skincare', 'text' => 'Flat 50% Off Top Picks', 'cta' => 'Explore', 'img' => skino_demo_image( 'skin', 'promo-2' ), 'shadow' => 'hover:shadow-[0_8px_25px_rgba(245,158,11,0.3)]' ),
	array( 'url' => skino_sale_url( 'j-beauty' ), 'bg' => 'from-teal-400 to-emerald-400', 'tag' => 'New Arrival', 'tagc' => 'text-teal-600', 'title' => 'J-Beauty<br>Secrets', 'text' => 'Buy 1 Get 1 Free Today', 'cta' => 'Shop Now', 'img' => skino_demo_image( 'skin', 'promo-3' ), 'shadow' => 'hover:shadow-[0_8px_25px_rgba(20,184,166,0.3)]' ),
	array( 'url' => skino_sale_url( 'k-beauty' ), 'bg' => 'from-indigo-500 to-violet-500', 'tag' => 'Mega Sale', 'tagc' => 'text-indigo-600', 'title' => 'K-Beauty<br>Bestsellers', 'text' => 'Starting at just ৳499', 'cta' => 'Grab Deal', 'img' => skino_demo_image( 'skin', 'promo-4' ), 'shadow' => 'hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]' ),
);

$concerns = array(
	array( 'Acne Care', 'ACNE CARE', 'Acne Care', 'Fight Acne, Shine Brighter' ),
	array( 'Anti Aging', 'ANTI AGING', 'Anti Aging', 'Turn Back Time, Keep the Glow' ),
	array( 'Spot Treatment', 'SPOT SOLUTION', 'Spot Treatment', 'Clear Skin, Spot-Free Confidence' ),
	array( 'Skin Dryness', 'DRY SKIN', 'Skin Dryness', 'Deep Hydration, Lasting Comfort' ),
	array( 'Oil Control', 'OIL CONTROL', 'Oil Control', 'Fight Acne, Shine Brighter' ),
	array( 'Sensitive Skin', 'SENSITIVE SKIN', 'Sensitive skin', 'Fight Acne, Shine Brighter' ),
	array( 'Dandruff', 'DANDRUFF TREATMENT', 'Dandruff', 'Dandruff-Free, Worry-Free' ),
	array( 'Hairfall', 'HAIRFALL SOLUTION', 'Hairfall', 'Say No to Fall, Yes to Fuller Hair' ),
	array( 'Combination Skin', 'COMBINATION SKIN', 'Combination Skin', 'Deep Hydration, Lasting Comfort' ),
	array( 'Dull Skin', 'DULL SKIN', 'Dull Skin', 'Fight Acne, Shine Brighter' ),
);

$features = array(
	array( 'ShieldCheck', 'Authentic Products', '100% Genuine Brands' ),
	array( 'Truck', 'Fast Delivery', 'All Over Bangladesh' ),
	array( 'RotateCcw', 'Easy Returns', '7 Days Return Policy' ),
	array( 'Headphones', '24/7 Support', 'Dedicated Help Center' ),
);

/** Latest = newest products; Best selling = WooCommerce popularity (falls back to newest until sales exist). */
$latest = $best = array();
if ( function_exists( 'wc_get_products' ) ) {
	$latest = wc_get_products( array( 'limit' => 8, 'orderby' => 'date', 'order' => 'DESC', 'status' => 'publish' ) );
	$best   = wc_get_products( array( 'limit' => 8, 'orderby' => 'popularity', 'order' => 'DESC', 'status' => 'publish' ) );
}

/** One slide of the product carousel. */
$render_slide = function ( $product ) {
	$d = skino_discount_percent( $product );
	?>
	<div class="swiper-slide border-r border-b border-gray-100 p-4 md:p-6 flex flex-col group relative bg-white !h-auto">
		<?php if ( $d > 0 ) : ?>
			<span class="absolute top-4 right-4 bg-[#7a2dd4] text-white text-[11px] font-bold w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-sm pointer-events-none">-<?php echo (int) $d; ?>%</span>
		<?php endif; ?>
		<div class="relative aspect-square mb-4 overflow-hidden flex items-center justify-center">
			<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>" class="block w-full h-full">
				<img src="<?php echo esc_url( skino_product_image_url( $product, 'woocommerce_thumbnail' ) ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" loading="lazy" class="object-cover w-full h-full">
			</a>
			<div class="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-end pb-8 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
				<button type="button" data-wishlist-id="<?php echo (int) $product->get_id(); ?>" class="wishlist-btn flex items-center gap-1.5 hover:text-gray-900 mb-3 text-[13px] font-medium text-gray-600">
					<?php skino_icon( 'Heart', 'w-4 h-4' ); ?> <span data-wishlist-label><?php esc_html_e( 'Add to Wishlist', 'skino' ); ?></span>
				</button>
				<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" class="bg-[#7a2dd4] text-white px-5 py-2 rounded-full text-xs font-semibold shadow hover:bg-purple-800 transition-colors"><?php esc_html_e( 'Add to Cart', 'skino' ); ?></button>
			</div>
		</div>
		<div class="flex flex-col flex-1 text-center mt-auto">
			<a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>"><h3 class="text-gray-500 font-normal text-[13px] md:text-sm leading-snug mb-3 hover:text-primary cursor-pointer line-clamp-2"><?php echo esc_html( $product->get_name() ); ?></h3></a>
			<div class="flex justify-center items-center gap-2 mt-auto pointer-events-none">
				<span class="text-[#7a2dd4] font-bold text-sm md:text-base"><?php echo esc_html( skino_money( $product->get_price() ) ); ?></span>
				<?php if ( $product->is_on_sale() ) : ?><span class="text-gray-400 line-through text-xs md:text-sm"><?php echo esc_html( skino_money( $product->get_regular_price() ) ); ?></span><?php endif; ?>
			</div>
		</div>
	</div>
	<?php
};
?>
<div class="bg-white">

	<!-- Hero slider -->
	<section class="w-full">
		<div class="swiper home-hero aspect-[1717/916] lg:aspect-auto lg:h-[500px]" data-hero-swiper>
			<div class="swiper-wrapper">
				<?php foreach ( $heroes as $i => $hero ) : ?>
					<div class="swiper-slide">
						<div class="relative w-full h-full overflow-hidden bg-gray-100">
							<img src="<?php echo esc_url( skino_asset( 'img/' . $hero[0] ) ); ?>" alt="<?php echo esc_attr( $hero[1] ); ?>" class="absolute inset-0 h-full w-full object-cover"<?php echo 0 === $i ? ' fetchpriority="high"' : ' loading="lazy"'; ?>>
							<div class="absolute inset-0 lg:bg-black/25"></div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</section>

	<!-- Categories -->
	<section class="py-6 border-b border-gray-100">
		<div class="container mx-auto px-2 md:px-4">
			<h2 class="text-[17px] md:text-2xl font-extrabold text-[#003366] mb-6 md:mb-8 text-center uppercase tracking-wide"><?php esc_html_e( 'EXPLORE PRODUCT BY CATEGORY', 'skino' ); ?></h2>
			<div class="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6 md:gap-4 lg:flex lg:gap-8 pb-4 justify-center px-1">
				<?php foreach ( $categories as $cat ) : ?>
					<a href="<?php echo esc_url( skino_category_url( $cat[0] ) ); ?>" class="flex flex-col items-center group cursor-pointer lg:min-w-[100px]">
						<div class="w-full aspect-square lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl md:rounded-full bg-gradient-to-b from-purple-200 via-purple-300 to-[#c758e8] p-[3px] mb-2 shadow-sm group-hover:shadow-md transition-shadow">
							<div class="w-full h-full rounded-[1.1rem] sm:rounded-[1.4rem] md:rounded-full overflow-hidden bg-white">
								<img src="<?php echo esc_url( skino_asset( 'img/' . $cat[1] ) ); ?>" alt="<?php echo esc_attr( $cat[0] ); ?>" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
							</div>
						</div>
						<span class="font-semibold text-[#004b7a] group-hover:text-primary transition-colors text-center text-[10px] sm:text-[12px] lg:text-base leading-tight mt-1 truncate w-full px-1"><?php echo esc_html( $cat[0] ); ?></span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- Free delivery banner -->
	<section class="py-6 md:py-10">
		<div class="container mx-auto px-4">
			<div class="w-full bg-gradient-to-r from-[#7bc4f4] to-[#9cd8f7] rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border border-blue-200">
				<div class="flex items-center gap-3 bg-gradient-to-b from-[#dfbb41] to-[#b99120] text-white px-5 py-2.5 rounded-lg shadow-lg border-2 border-[#f7da72]">
					<?php skino_icon( 'Truck', 'w-10 h-10 md:w-12 md:h-12 text-white' ); ?>
					<div class="flex flex-col items-start leading-none">
						<span class="font-extrabold text-xl md:text-3xl tracking-wide">FREE</span>
						<span class="text-[11px] md:text-sm font-bold tracking-widest mt-1">DELIVERY</span>
					</div>
				</div>
				<div class="flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-0">
					<div class="flex flex-wrap items-center justify-center md:justify-start gap-2 text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
						<span>On All</span>
						<span class="bg-gradient-to-b from-[#dfbb41] to-[#b99120] text-white px-3 py-0.5 rounded-md shadow-md border border-[#f7da72] font-extrabold">Skino</span>
						<span>Products</span>
					</div>
					<span class="text-sm md:text-lg text-gray-800 mt-2 font-medium">Don't miss the chance to glow for less</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Top brands -->
	<section class="py-8 bg-white">
		<div class="container mx-auto px-4">
			<h2 class="text-xl md:text-3xl font-montserrat font-semibold text-secondary mb-6"><?php esc_html_e( 'Explore Our Top Brands', 'skino' ); ?></h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
				<?php foreach ( $top_brands as $b ) : ?>
					<a href="<?php echo esc_url( skino_brand_url( $b[0] ) ); ?>" class="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-shadow overflow-hidden border border-gray-50 flex flex-col text-center">
						<div class="aspect-[4/3] bg-gradient-to-t from-gray-50 to-white p-1"><img src="<?php echo esc_url( $b[2] ); ?>" alt="<?php echo esc_attr( $b[0] ); ?>" loading="lazy" class="w-full h-full object-cover rounded-lg"></div>
						<div class="p-3 flex flex-col flex-1 justify-center">
							<h3 class="text-black font-bold font-montserrat text-sm md:text-lg tracking-wide"><?php echo esc_html( $b[0] ); ?></h3>
							<p class="hidden md:block text-xs text-textMain mt-1 font-medium"><?php echo esc_html( $b[1] ); ?></p>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- Latest / Best selling -->
	<section class="py-10 bg-white" data-product-tabs>
		<div class="container mx-auto px-4 max-w-6xl">
			<div class="flex flex-col items-center justify-center mb-8 relative">
				<div class="flex items-center justify-center w-full gap-4 md:gap-8 font-bold text-[13px] md:text-sm">
					<button type="button" data-tab="latest" class="tab-btn uppercase tracking-wider text-gray-600 hover:text-primary">Latest Products</button>
					<span class="text-gray-300">/</span>
					<button type="button" data-tab="best" class="tab-btn uppercase tracking-wider is-active">Best Selling</button>
				</div>
				<div class="hidden md:flex gap-2 absolute right-0">
					<button type="button" data-tab-prev class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors text-xs bg-white" aria-label="Previous">&lt;</button>
					<button type="button" data-tab-next class="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors text-xs bg-white" aria-label="Next">&gt;</button>
				</div>
			</div>
			<?php foreach ( array( 'best' => $best, 'latest' => $latest ) as $key => $list ) : ?>
				<div class="swiper border-l border-t border-gray-100 <?php echo 'best' === $key ? '' : 'hidden'; ?>" data-tab-panel="<?php echo esc_attr( $key ); ?>">
					<div class="swiper-wrapper">
						<?php foreach ( $list as $p ) { $render_slide( $p ); } ?>
					</div>
				</div>
			<?php endforeach; ?>
			<?php if ( ! $best && ! $latest ) : ?>
				<p class="text-center text-gray-400 py-10"><?php esc_html_e( 'No products yet. Import the product CSV (see the README) to fill this section.', 'skino' ); ?></p>
			<?php endif; ?>
		</div>
	</section>

	<!-- Offers -->
	<section class="py-10 bg-white">
		<div class="container mx-auto px-4 max-w-6xl">
			<h2 class="text-lg md:text-xl font-montserrat font-bold text-gray-900 mb-6"><?php esc_html_e( 'Explore Our Offer', 'skino' ); ?></h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
				<?php foreach ( $offers as $o ) : ?>
					<a href="<?php echo esc_url( $o['url'] ); ?>" class="relative flex flex-col justify-center p-6 md:p-8 overflow-hidden rounded-xl shadow-sm <?php echo esc_attr( $o['shadow'] ); ?> transition-all duration-300 group bg-gradient-to-r <?php echo esc_attr( $o['bg'] ); ?> min-h-[180px] md:min-h-[220px]">
						<div class="absolute right-0 top-0 w-2/3 md:w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
							<img src="<?php echo esc_url( $o['img'] ); ?>" class="w-full h-full object-cover rounded-full mix-blend-overlay" alt="" loading="lazy">
						</div>
						<div class="relative z-10 text-white max-w-[70%] md:max-w-[60%]">
							<span class="bg-white <?php echo esc_attr( $o['tagc'] ); ?> text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm"><?php echo esc_html( $o['tag'] ); ?></span>
							<h3 class="text-xl md:text-3xl font-montserrat font-bold mb-1 md:mb-2 leading-tight drop-shadow-md !text-white"><?php echo wp_kses( $o['title'], array( 'br' => array() ) ); ?></h3>
							<p class="text-xs md:text-sm opacity-90 mb-3 md:mb-4 drop-shadow-sm font-medium"><?php echo esc_html( $o['text'] ); ?></p>
							<span class="inline-flex items-center gap-1 font-bold text-xs md:text-sm underline underline-offset-4"><?php echo esc_html( $o['cta'] ); ?> <?php skino_icon( 'ChevronRight', 'w-4 h-4' ); ?></span>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- Skin concerns -->
	<section class="py-12 bg-gray-50 border-t border-gray-100">
		<div class="container mx-auto px-4 max-w-6xl">
			<h2 class="text-xl md:text-2xl font-montserrat font-bold text-gray-900 mb-8"><?php esc_html_e( 'Shop By Skin Concern', 'skino' ); ?></h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
				<?php foreach ( $concerns as $i => $c ) : ?>
					<a href="<?php echo esc_url( skino_category_url( $c[0] ) ); ?>" class="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all h-[232px] md:h-[240px] flex flex-col overflow-hidden group hover:-translate-y-1">
						<div class="w-full h-36 bg-gradient-to-b from-[#eedabe] to-[#fcf6ee] absolute top-0 left-0 z-0 transition-colors group-hover:from-[#e3cbab]" style="clip-path: polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)"></div>
						<div class="z-10 flex flex-col items-center w-full h-full pt-4 px-3">
							<span class="text-[#d11175] font-bold text-sm md:text-[15px] tracking-wide uppercase drop-shadow-sm text-center leading-tight h-10 w-full flex items-center justify-center"><?php echo esc_html( $c[1] ); ?></span>
							<div class="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full border-4 border-white shadow-sm overflow-hidden mt-1 bg-gray-50 z-20">
								<img src="<?php echo esc_url( skino_asset( 'img/concerns/concern_' . $i . '.png' ) ); ?>" alt="<?php echo esc_attr( $c[2] ); ?>" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
							</div>
							<div class="mt-auto w-full pb-3 md:pb-4 text-center md:text-left min-h-[68px]">
								<h4 class="text-[#a24892] font-semibold text-[13px] md:text-sm"><?php echo esc_html( $c[2] ); ?></h4>
								<p class="text-gray-500 text-[10px] md:text-[11px] leading-snug mt-1"><?php echo esc_html( $c[3] ); ?></p>
							</div>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="py-12 bg-white border-t border-gray-100">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				<?php foreach ( $features as $f ) : ?>
					<div class="flex flex-col items-center text-center p-4">
						<?php skino_icon( $f[0], 'w-10 h-10 text-primary mb-4' ); ?>
						<h4 class="font-montserrat font-bold text-secondary mb-1"><?php echo esc_html( $f[1] ); ?></h4>
						<p class="text-xs text-textMuted"><?php echo esc_html( $f[2] ); ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>
</div>
<?php
get_footer();
