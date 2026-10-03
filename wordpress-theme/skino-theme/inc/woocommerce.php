<?php
/**
 * WooCommerce integration: query tweaks, cart drawer markup, admin notices.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Catalogue pages show 24 products per page (the React app listed everything at once).
add_filter( 'loop_shop_per_page', function () {
	return 24;
}, 20 );

// Searching from the header searches products only.
add_action( 'pre_get_posts', function ( $query ) {
	if ( ! is_admin() && $query->is_main_query() && $query->is_search() && ! $query->get( 'post_type' ) ) {
		$query->set( 'post_type', 'product' );
	}
	if ( ! is_admin() && $query->is_main_query() && $query->is_search() && 'product' === $query->get( 'post_type' ) ) {
		$query->set( 'posts_per_page', 24 );
	}
} );

add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( ! class_exists( 'WooCommerce' ) ) {
		echo '<div class="notice notice-warning"><p><strong>Skino theme:</strong> please install and activate the free <em>WooCommerce</em> plugin. The shop, cart and checkout need it.</p></div>';
	} elseif ( ! taxonomy_exists( 'product_brand' ) ) {
		echo '<div class="notice notice-warning"><p><strong>Skino theme:</strong> brand pages need WooCommerce 9.6 or newer (it adds the Brands taxonomy). Please update WooCommerce.</p></div>';
	}
} );

/** Number of distinct lines in the cart. */
function skino_cart_count() {
	return ( function_exists( 'WC' ) && WC()->cart ) ? count( WC()->cart->get_cart() ) : 0;
}

/** Inner HTML of the slide-out cart (also returned by the AJAX cart actions). */
function skino_cart_drawer_inner() {
	$cart = WC()->cart;
	ob_start();
	$items = $cart ? $cart->get_cart() : array();
	?>
	<div class="p-4 border-b flex justify-between items-center bg-gray-50">
		<h2 class="text-xl font-bold flex items-center gap-2">
			<?php skino_icon( 'ShoppingBag', 'w-5 h-5 text-primary' ); ?>
			<?php printf( esc_html__( 'Your Cart (%d)', 'skino' ), count( $items ) ); ?>
		</h2>
		<button type="button" data-cart-close class="p-2 hover:bg-gray-200 rounded-full transition" aria-label="<?php esc_attr_e( 'Close cart', 'skino' ); ?>">
			<?php skino_icon( 'X', 'w-5 h-5' ); ?>
		</button>
	</div>

	<div class="flex-1 overflow-y-auto p-4 space-y-4">
		<?php if ( ! $items ) : ?>
			<div class="text-center text-gray-500 mt-10">
				<?php skino_icon( 'ShoppingBag', 'w-12 h-12 mx-auto text-gray-300 mb-3' ); ?>
				<p><?php esc_html_e( 'Your cart is empty.', 'skino' ); ?></p>
			</div>
		<?php else : ?>
			<?php foreach ( $items as $key => $item ) :
				$product = $item['data'];
				if ( ! $product || ! $product->exists() ) {
					continue;
				}
				?>
				<div class="flex gap-4 border-b pb-4" data-cart-key="<?php echo esc_attr( $key ); ?>">
					<img src="<?php echo esc_url( skino_product_image_url( $product, 'woocommerce_thumbnail' ) ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" class="w-20 h-20 object-cover rounded-lg bg-gray-100" width="80" height="80">
					<div class="flex-1">
						<h3 class="font-medium text-sm line-clamp-2 text-gray-800"><?php echo esc_html( $product->get_name() ); ?></h3>
						<div class="text-primary font-bold mt-1"><?php echo esc_html( skino_money( $product->get_price() ) ); ?></div>
						<div class="flex justify-between items-center mt-2">
							<div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
								<button type="button" data-cart-qty="-1" class="p-1 hover:bg-white rounded shadow-sm transition" aria-label="<?php esc_attr_e( 'Decrease quantity', 'skino' ); ?>"><?php skino_icon( 'Minus', 'w-3 h-3' ); ?></button>
								<span class="text-sm font-medium w-4 text-center" data-qty="<?php echo (int) $item['quantity']; ?>"><?php echo (int) $item['quantity']; ?></span>
								<button type="button" data-cart-qty="1" class="p-1 hover:bg-white rounded shadow-sm transition" aria-label="<?php esc_attr_e( 'Increase quantity', 'skino' ); ?>"><?php skino_icon( 'Plus', 'w-3 h-3' ); ?></button>
							</div>
							<button type="button" data-cart-remove class="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition" aria-label="<?php esc_attr_e( 'Remove', 'skino' ); ?>"><?php skino_icon( 'Trash2', 'w-4 h-4' ); ?></button>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>

	<?php if ( $items ) : ?>
		<div class="p-4 border-t bg-gray-50">
			<div class="flex justify-between mb-4 text-lg font-bold">
				<span><?php esc_html_e( 'Subtotal', 'skino' ); ?></span>
				<span class="text-primary"><?php echo esc_html( skino_money( $cart->get_subtotal() ) ); ?></span>
			</div>
			<a href="<?php echo esc_url( wc_get_checkout_url() ); ?>" class="block text-center w-full bg-primary hover:bg-primaryDark text-white py-3 rounded-xl font-bold transition-colors">
				<?php esc_html_e( 'Buy Now', 'skino' ); ?>
			</a>
		</div>
	<?php endif; ?>
	<?php
	return ob_get_clean();
}

// Keep the header badges in sync with WooCommerce's own cart fragments too (e.g. after a normal add-to-cart).
add_filter( 'woocommerce_add_to_cart_fragments', function ( $fragments ) {
	$fragments['#cart-drawer-inner'] = '<div id="cart-drawer-inner" class="flex flex-col h-full">' . skino_cart_drawer_inner() . '</div>';
	return $fragments;
} );

// The generated packshot / category photo is used wherever WooCommerce would print its grey placeholder.
add_filter( 'woocommerce_placeholder_img_src', function () {
	return skino_asset( 'img/cat_skincare.png' );
} );
