<?php
/**
 * Order summary: product photos with quantity badges, delivery and total.
 * Overrides woocommerce/checkout/review-order.php. The root keeps WooCommerce's class so AJAX refreshes replace it.
 */
defined( 'ABSPATH' ) || exit;
$has_fee = false;
?>
<div class="woocommerce-checkout-review-order-table skino-summary">
	<?php do_action( 'woocommerce_review_order_before_cart_contents' ); ?>
	<ul class="skino-lines">
		<?php
		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			$visible  = apply_filters( 'woocommerce_checkout_cart_item_visible', true, $cart_item, $cart_item_key );
			if ( ! ( $_product instanceof WC_Product && $_product->exists() && $cart_item['quantity'] > 0 && $visible ) ) {
				continue;
			}
			?>
			<li class="<?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">
				<span class="skino-line-img">
					<img src="<?php echo esc_url( skino_product_image_url( $_product, 'woocommerce_thumbnail' ) ); ?>" alt="" width="56" height="56">
					<b><?php echo (int) $cart_item['quantity']; ?></b>
				</span>
				<span class="skino-line-name">
					<?php echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) ); ?>
					<?php echo wc_get_formatted_cart_item_data( $cart_item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</span>
				<span class="skino-line-price"><?php echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
			</li>
			<?php
		}
		?>
	</ul>
	<?php do_action( 'woocommerce_review_order_after_cart_contents' ); ?>

	<dl class="skino-totals">
		<div class="cart-subtotal"><dt><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></dt><dd><?php wc_cart_totals_subtotal_html(); ?></dd></div>

		<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
			<div class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>"><dt><?php wc_cart_totals_coupon_label( $coupon ); ?></dt><dd><?php wc_cart_totals_coupon_html( $coupon ); ?></dd></div>
		<?php endforeach; ?>

		<?php foreach ( WC()->cart->get_fees() as $fee ) : $has_fee = true; ?>
			<div class="fee"><dt><?php echo esc_html( $fee->name ); ?></dt><dd><?php wc_cart_totals_fee_html( $fee ); ?></dd></div>
		<?php endforeach; ?>
		<?php if ( ! $has_fee ) : ?>
			<div class="fee skino-fee-pending"><dt><?php esc_html_e( 'Delivery', 'skino' ); ?></dt><dd><?php esc_html_e( 'Choose your location', 'skino' ); ?></dd></div>
		<?php endif; ?>

		<?php do_action( 'woocommerce_review_order_before_order_total' ); ?>
		<div class="order-total"><dt><?php esc_html_e( 'Total', 'woocommerce' ); ?></dt><dd><?php wc_cart_totals_order_total_html(); ?></dd></div>
		<?php do_action( 'woocommerce_review_order_after_order_total' ); ?>
	</dl>
</div>
