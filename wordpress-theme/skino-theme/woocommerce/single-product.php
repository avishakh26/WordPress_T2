<?php
/**
 * Single product page (ported from ProductDetailsPage.jsx).
 * Reviews use WooCommerce's native review system instead of the demo reviews held in the React app.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();

while ( have_posts() ) :
	the_post();
	$product = wc_get_product( get_the_ID() );
	if ( ! $product ) {
		continue;
	}

	$cats     = get_the_terms( $product->get_id(), 'product_cat' );
	$cat      = ( $cats && ! is_wp_error( $cats ) ) ? $cats[0] : null;
	$brands   = get_the_terms( $product->get_id(), skino_brand_taxonomy() );
	$brand    = ( $brands && ! is_wp_error( $brands ) ) ? $brands[0] : null;
	$family   = skino_family( $cat ? $cat->name : '' );
	$fam      = skino_family_data( $family );
	list( $rating, $review_count ) = skino_product_rating( $product );
	$price    = (float) $product->get_price();
	$regular  = (float) $product->get_regular_price();
	$discount = skino_discount_percent( $product );
	$buyable  = $product->is_purchasable() && $product->is_in_stock() && $product->is_type( 'simple' );

	// Gallery: main photo (or generated packshot), extra WooCommerce gallery images, then category lifestyle photos.
	$gallery = array( array( 'src' => skino_product_image_url( $product, 'large' ), 'label' => __( 'The product', 'skino' ) ) );
	foreach ( $product->get_gallery_image_ids() as $gid ) {
		$gallery[] = array( 'src' => wp_get_attachment_image_url( $gid, 'large' ), 'label' => get_the_title( $gid ) );
	}
	foreach ( $fam['images'] as $img ) {
		$gallery[] = array( 'src' => skino_asset( 'img/' . $img[0] ), 'label' => $img[1] );
	}
	$gallery = array_values( array_filter( $gallery, function ( $g ) { return ! empty( $g['src'] ); } ) );
	?>
	<div class="bg-white" data-product-page>
		<nav aria-label="Breadcrumb" class="bg-cream border-b border-sand text-sm text-textMuted">
			<ol class="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
				<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-gold"><?php esc_html_e( 'Home', 'skino' ); ?></a></li>
				<?php if ( $cat ) : ?>
					<li aria-hidden="true"><?php skino_icon( 'ChevronRight', 'w-4 h-4' ); ?></li>
					<li><a href="<?php echo esc_url( get_term_link( $cat ) ); ?>" class="hover:text-gold"><?php echo esc_html( $cat->name ); ?></a></li>
				<?php endif; ?>
				<li aria-hidden="true"><?php skino_icon( 'ChevronRight', 'w-4 h-4' ); ?></li>
				<li aria-current="page" class="text-ink font-medium"><?php the_title(); ?></li>
			</ol>
		</nav>

		<!-- Hero -->
		<section id="top" class="bg-cream scroll-mt-28">
			<div class="container mx-auto px-4 py-5 md:py-12 grid md:grid-cols-2 lg:grid-cols-[5fr_6fr] gap-6 md:gap-8 lg:gap-14 items-start">
				<div class="order-1 min-w-0 w-full max-w-[560px] md:max-w-none mx-auto lg:max-w-[520px] lg:mx-0" data-gallery>
					<div class="relative rounded-3xl overflow-hidden shadow-[0_30px_70px_-30px_rgba(43,36,32,0.45)] aspect-[5/4] sm:aspect-square bg-sand cursor-zoom-in" data-gallery-stage>
						<img data-gallery-main src="<?php echo esc_url( $gallery[0]['src'] ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" fetchpriority="high" width="1024" height="1024" draggable="false" class="w-full h-full object-cover transition-transform duration-300 ease-out">
						<?php if ( $discount > 0 ) : ?><span class="absolute top-4 left-4 bg-gold text-white text-sm font-bold px-4 py-1.5 rounded-full shadow">Save <?php echo (int) $discount; ?>%</span><?php endif; ?>
						<?php skino_wishlist_button( $product->get_id(), 'absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow transition-all hover:scale-110 bg-white text-ink' ); ?>
					</div>
					<?php if ( count( $gallery ) > 1 ) : ?>
						<div class="mt-3 flex items-center gap-2" role="group" aria-label="<?php esc_attr_e( 'Product photos', 'skino' ); ?>">
							<button type="button" data-gallery-prev aria-label="<?php esc_attr_e( 'Previous photo', 'skino' ); ?>" class="w-8 h-8 shrink-0 flex items-center justify-center text-ink/60 hover:text-gold"><?php skino_icon( 'ChevronLeft', 'w-5 h-5' ); ?></button>
							<div class="flex gap-2.5 overflow-x-auto hide-scrollbar flex-1 py-1">
								<?php foreach ( $gallery as $i => $g ) : ?>
									<button type="button" data-gallery-thumb="<?php echo esc_url( $g['src'] ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Show %s', 'skino' ), $g['label'] ) ); ?>" class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all <?php echo 0 === $i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'; ?>">
										<img src="<?php echo esc_url( $g['src'] ); ?>" alt="" loading="lazy" class="w-full h-full object-cover">
									</button>
								<?php endforeach; ?>
							</div>
							<button type="button" data-gallery-next aria-label="<?php esc_attr_e( 'Next photo', 'skino' ); ?>" class="w-8 h-8 shrink-0 flex items-center justify-center text-ink/60 hover:text-gold"><?php skino_icon( 'ChevronRight', 'w-5 h-5' ); ?></button>
						</div>
					<?php endif; ?>
				</div>

				<div class="order-2 pt-4 lg:pt-0">
					<p class="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4"><?php echo esc_html( trim( ( $brand ? $brand->name : '' ) . ' · ' . ( $cat ? $cat->name : '' ), ' ·' ) ); ?></p>
					<h1 class="font-serif text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.15]"><?php the_title(); ?></h1>
					<div class="mt-3 flex items-center gap-2"><?php skino_stars( $rating, 'w-4 h-4' ); ?><a href="#reviews" class="text-sm text-textMain hover:text-gold">(<?php echo (int) $review_count; ?> <?php esc_html_e( 'reviews', 'skino' ); ?>)</a></div>
					<p class="mt-3 md:mt-5 text-base md:text-lg text-textMain leading-relaxed max-w-xl">
						<?php
						printf(
							/* translators: 1: product noun, 2: brand */
							esc_html__( 'Authentic %1$s%2$s. Delivered to your door with Cash on Delivery and a 7-day return promise.', 'skino' ),
							esc_html( $fam['noun'] ),
							$brand ? esc_html( ' from ' . $brand->name ) : ''
						);
						?>
					</p>
					<?php if ( $product->get_short_description() ) : ?>
						<div class="mt-3 text-textMain max-w-xl"><?php echo wp_kses_post( $product->get_short_description() ); ?></div>
					<?php endif; ?>

					<ul class="mt-4 md:mt-6 space-y-2 md:space-y-2.5 text-ink text-[15px] md:text-base">
						<?php foreach ( $fam['bullets'] as $b ) : ?>
							<li class="flex items-start gap-3"><?php skino_icon( 'Check', 'w-5 h-5 text-sage mt-0.5 shrink-0' ); ?><?php echo esc_html( $b ); ?></li>
						<?php endforeach; ?>
					</ul>

					<div class="mt-5 md:mt-8 flex items-end gap-x-3 gap-y-1 flex-wrap">
						<span class="font-serif text-4xl md:text-5xl font-bold text-ink"><?php echo esc_html( skino_money( $price ) ); ?></span>
						<?php if ( $product->is_on_sale() && $regular > $price ) : ?>
							<span class="text-xl text-textMuted line-through mb-1.5"><?php echo esc_html( skino_money( $regular ) ); ?></span>
							<span class="mb-2 text-sm font-semibold text-sage bg-sage/10 px-3 py-1 rounded-full">You save <?php echo esc_html( skino_money( $regular - $price ) ); ?></span>
						<?php endif; ?>
					</div>
					<p class="mt-1 text-sm text-textMuted"><?php echo $product->is_in_stock() ? esc_html__( 'In stock · Ships same day if ordered before 4 PM', 'skino' ) : esc_html__( 'Out of stock', 'skino' ); ?></p>

					<?php if ( $buyable ) : ?>
						<div class="mt-5 md:mt-8" data-buy-box data-product-id="<?php echo (int) $product->get_id(); ?>" data-price="<?php echo esc_attr( $price ); ?>">
							<div class="flex items-center justify-between gap-4">
								<div class="inline-flex items-center border border-ink/20 rounded-full h-12 bg-white" role="group" aria-label="<?php esc_attr_e( 'Quantity', 'skino' ); ?>">
									<button type="button" data-qty-step="-1" aria-label="<?php esc_attr_e( 'Decrease quantity', 'skino' ); ?>" class="w-12 h-full flex items-center justify-center text-ink hover:text-gold disabled:opacity-40 rounded-l-full"><?php skino_icon( 'Minus', 'w-4 h-4' ); ?></button>
									<span class="w-8 text-center font-semibold text-ink tabular-nums" data-qty-value aria-live="polite">1</span>
									<button type="button" data-qty-step="1" aria-label="<?php esc_attr_e( 'Increase quantity', 'skino' ); ?>" class="w-12 h-full flex items-center justify-center text-ink hover:text-gold disabled:opacity-40 rounded-r-full"><?php skino_icon( 'Plus', 'w-4 h-4' ); ?></button>
								</div>
								<p class="text-sm text-textMuted">Total <span class="block sm:inline text-lg font-bold text-ink" data-total><?php echo esc_html( skino_money( $price ) ); ?></span></p>
							</div>
							<div id="buy-row" class="mt-4 grid grid-cols-2 gap-3">
								<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" data-qty-from="[data-buy-box]" class="h-12 sm:h-14 px-4 rounded-full border-2 border-ink text-ink font-semibold text-sm sm:text-base hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2">
									<?php skino_icon( 'ShoppingBag', 'w-5 h-5' ); ?> <?php esc_html_e( 'Add to Cart', 'skino' ); ?>
								</button>
								<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" data-buy-now="1" data-qty-from="[data-buy-box]" class="h-12 sm:h-14 px-4 rounded-full bg-ink text-white font-semibold text-sm sm:text-base hover:bg-goldDark transition-all hover:-translate-y-0.5 shadow-lg shadow-ink/20 flex items-center justify-center gap-2">
									<?php esc_html_e( 'Buy Now', 'skino' ); ?> <?php skino_icon( 'ArrowRight', 'w-5 h-5' ); ?>
								</button>
							</div>
						</div>
					<?php endif; ?>

					<div class="mt-6 md:mt-8 grid grid-cols-3 gap-2 sm:gap-3 text-center text-[11px] leading-tight sm:text-sm text-ink border-t border-sand pt-5 md:pt-6">
						<div class="flex flex-col items-center gap-1.5"><?php skino_icon( 'Banknote', 'w-5 h-5 text-gold' ); ?>Cash on delivery</div>
						<div class="flex flex-col items-center gap-1.5"><?php skino_icon( 'Truck', 'w-5 h-5 text-gold' ); ?>1-2 day Dhaka delivery</div>
						<div class="flex flex-col items-center gap-1.5"><?php skino_icon( 'RotateCcw', 'w-5 h-5 text-gold' ); ?>7-day returns</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Trust badges -->
		<section aria-label="<?php esc_attr_e( 'Our promises', 'skino' ); ?>" class="bg-white border-y border-sand">
			<div class="container mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
				<?php
				$trust = array(
					array( 'Lock', 'Secure payment', 'Cash on delivery or bKash. No card details needed.' ),
					array( 'BadgeCheck', '100% authentic', 'Sourced from authorized distributors and checked.' ),
					array( 'Truck', 'Fast delivery', '1-2 days in Dhaka, 3-5 days nationwide.' ),
					array( 'RotateCcw', '7-day easy returns', 'Damaged or wrong item? Replaced or refunded.' ),
				);
				foreach ( $trust as $t ) :
					?>
					<div class="reveal flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-4">
						<span class="w-12 h-12 shrink-0 rounded-full bg-cream flex items-center justify-center text-gold"><?php skino_icon( $t[0], 'w-6 h-6' ); ?></span>
						<div>
							<h3 class="font-sans text-sm sm:text-base font-semibold text-ink"><?php echo esc_html( $t[1] ); ?></h3>
							<p class="text-xs sm:text-sm text-textMain mt-0.5 leading-snug"><?php echo esc_html( $t[2] ); ?></p>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</section>

		<?php if ( get_the_content() ) : ?>
			<section class="py-12 md:py-16 bg-white">
				<div class="container mx-auto px-4 max-w-3xl skino-prose"><?php the_content(); ?></div>
			</section>
		<?php endif; ?>

		<!-- Reviews (WooCommerce) -->
		<section id="reviews" class="scroll-mt-14 py-12 md:py-24 bg-cream">
			<div class="container mx-auto px-4 max-w-4xl skino-reviews">
				<div class="text-center max-w-2xl mx-auto mb-8 md:mb-12">
					<p class="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-3"><?php esc_html_e( 'Customer reviews', 'skino' ); ?></p>
					<h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-tight"><?php esc_html_e( 'What customers say', 'skino' ); ?></h2>
				</div>
				<?php
				if ( comments_open() || get_comments_number() ) {
					comments_template();
				}
				?>
			</div>
		</section>

		<!-- Delivery -->
		<section id="delivery" class="scroll-mt-14 py-16 md:py-20 bg-ink text-cream">
			<div class="container mx-auto px-4 grid md:grid-cols-3 gap-8">
				<?php
				$delivery = array(
					array( 'Truck', 'Inside Dhaka', '1-2 working days · ৳60 delivery charge' ),
					array( 'MapPin', 'Outside Dhaka', '3-5 working days · ৳120 delivery charge' ),
					array( 'Banknote', 'Pay your way', 'Cash on Delivery or bKash. Order confirmation by call and SMS.' ),
				);
				foreach ( $delivery as $d ) :
					?>
					<div class="reveal flex gap-4">
						<span class="w-12 h-12 shrink-0 rounded-full bg-white/10 text-gold flex items-center justify-center"><?php skino_icon( $d[0], 'w-6 h-6' ); ?></span>
						<div><h3 class="font-serif text-2xl !text-white"><?php echo esc_html( $d[1] ); ?></h3><p class="text-cream/80 mt-1"><?php echo esc_html( $d[2] ); ?></p></div>
					</div>
				<?php endforeach; ?>
			</div>
		</section>

		<?php if ( $buyable ) : ?>
			<!-- Mobile sticky buy bar -->
			<div data-sticky-bar class="fixed bottom-16 inset-x-0 z-40 lg:hidden bg-white border-t border-sand shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2 transition-all duration-300 translate-y-full opacity-0 pointer-events-none" aria-hidden="true">
				<div class="leading-tight mr-1">
					<p class="text-xl font-bold text-ink"><?php echo esc_html( skino_money( $price ) ); ?></p>
					<?php if ( $product->is_on_sale() ) : ?><p class="text-xs text-textMuted line-through"><?php echo esc_html( skino_money( $regular ) ); ?></p><?php endif; ?>
				</div>
				<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" data-qty-from="[data-buy-box]" aria-label="<?php esc_attr_e( 'Add to cart', 'skino' ); ?>" class="h-11 w-11 shrink-0 rounded-full border-2 border-ink text-ink flex items-center justify-center"><?php skino_icon( 'ShoppingBag', 'w-5 h-5' ); ?></button>
				<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" data-buy-now="1" data-qty-from="[data-buy-box]" class="flex-1 h-11 rounded-full bg-ink text-white font-semibold hover:bg-goldDark transition-colors"><?php esc_html_e( 'Buy Now', 'skino' ); ?></button>
			</div>
		<?php endif; ?>
	</div>
	<?php
endwhile;

get_footer();
