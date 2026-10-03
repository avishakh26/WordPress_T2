<?php
/**
 * Product card used in category, brand, search, sale and wishlist grids.
 *
 * @var array $args { product: WC_Product }
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$product = $args['product'];
list( $rating, $reviews ) = skino_product_rating( $product );
$discount = skino_discount_percent( $product );
$link     = get_permalink( $product->get_id() );
?>
<div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100 flex flex-col" data-product-card="<?php echo (int) $product->get_id(); ?>">
	<div class="relative aspect-square overflow-hidden bg-gray-50">
		<a href="<?php echo esc_url( $link ); ?>" class="block w-full h-full">
			<img src="<?php echo esc_url( skino_product_image_url( $product, 'woocommerce_thumbnail' ) ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" loading="lazy" class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500">
		</a>
		<?php if ( $discount > 0 ) : ?>
			<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-<?php echo (int) $discount; ?>%</div>
		<?php endif; ?>
		<?php skino_wishlist_button( $product->get_id(), 'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all z-10 bg-white text-gray-400 hover:text-red-500' ); ?>
	</div>
	<div class="p-3 flex flex-col flex-1">
		<a href="<?php echo esc_url( $link ); ?>">
			<h3 class="text-sm font-medium text-secondary leading-snug line-clamp-2 mb-2 hover:text-primary transition-colors"><?php echo esc_html( $product->get_name() ); ?></h3>
		</a>
		<div class="flex items-center gap-1 mb-2">
			<?php skino_stars( $rating ); ?>
			<span class="text-xs text-gray-400 ml-1">(<?php echo (int) $reviews; ?>)</span>
		</div>
		<div class="flex flex-col mb-3 mt-auto">
			<?php if ( $product->is_on_sale() ) : ?>
				<span class="text-xs text-gray-400 line-through"><?php echo esc_html( skino_money( $product->get_regular_price() ) ); ?></span>
			<?php endif; ?>
			<span class="text-lg font-bold text-primary"><?php echo esc_html( skino_money( $product->get_price() ) ); ?></span>
		</div>
		<?php if ( $product->is_purchasable() && $product->is_in_stock() && $product->is_type( 'simple' ) ) : ?>
			<button type="button" data-add-to-cart="<?php echo (int) $product->get_id(); ?>" class="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
				<?php skino_icon( 'ShoppingCart', 'w-4 h-4' ); ?> <?php esc_html_e( 'Add to Cart', 'skino' ); ?>
			</button>
		<?php else : ?>
			<a href="<?php echo esc_url( $link ); ?>" class="w-full bg-gray-100 text-secondary py-2 rounded-lg text-sm font-semibold text-center"><?php esc_html_e( 'View product', 'skino' ); ?></a>
		<?php endif; ?>
	</div>
</div>
