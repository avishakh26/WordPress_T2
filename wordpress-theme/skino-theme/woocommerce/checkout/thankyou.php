<?php
/**
 * Order confirmation page. Overrides woocommerce/checkout/thankyou.php.
 *
 * @var WC_Order $order
 */
defined( 'ABSPATH' ) || exit;

$labels = skino_delivery_labels();
$loc    = $order ? $order->get_meta( '_skino_delivery_location' ) : '';
$eta    = ( 'outside' === $loc ) ? __( '3 to 5 working days', 'skino' ) : __( '1 to 2 working days', 'skino' );
?>
<div class="woocommerce-order skino-thanks">
	<?php if ( $order ) : ?>
		<?php do_action( 'woocommerce_before_thankyou', $order->get_id() ); ?>

		<?php if ( $order->has_status( 'failed' ) ) : ?>
			<div class="skino-thanks-hero is-failed">
				<h1><?php esc_html_e( 'Your payment did not go through', 'skino' ); ?></h1>
				<p><?php esc_html_e( 'Nothing was charged. Please try placing your order again.', 'skino' ); ?></p>
				<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="skino-btn"><?php esc_html_e( 'Try again', 'skino' ); ?></a>
			</div>
		<?php else : ?>
			<div class="skino-thanks-hero">
				<span class="skino-thanks-tick"><?php skino_icon( 'Check', 'w-8 h-8' ); ?></span>
				<h1><?php echo esc_html( sprintf( __( 'Thank you, %s!', 'skino' ), $order->get_billing_first_name() ) ); ?></h1>
				<p>
					<?php
					echo $order->has_status( 'on-hold' )
						? esc_html__( 'We have received your order and your bKash details. We will confirm the payment shortly.', 'skino' )
						: esc_html__( 'Your order is confirmed. Pay in cash when it arrives.', 'skino' );
					?>
				</p>
			</div>

			<ul class="skino-thanks-meta">
				<li><span><?php esc_html_e( 'Order number', 'skino' ); ?></span><strong>#<?php echo esc_html( $order->get_order_number() ); ?></strong></li>
				<li><span><?php esc_html_e( 'Date', 'skino' ); ?></span><strong><?php echo esc_html( wc_format_datetime( $order->get_date_created() ) ); ?></strong></li>
				<li><span><?php esc_html_e( 'Total', 'skino' ); ?></span><strong><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong></li>
				<li><span><?php esc_html_e( 'Payment', 'skino' ); ?></span><strong><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></strong></li>
			</ul>

			<section class="skino-card">
				<h2 class="skino-card-title"><?php esc_html_e( 'What happens next', 'skino' ); ?></h2>
				<ol class="skino-next">
					<li><span><?php skino_icon( 'Phone', 'w-5 h-5' ); ?></span><div><strong><?php esc_html_e( 'We confirm your order', 'skino' ); ?></strong><p><?php echo esc_html( sprintf( __( 'Expect a call or SMS on %s.', 'skino' ), $order->get_billing_phone() ) ); ?></p></div></li>
					<li><span><?php skino_icon( 'Package', 'w-5 h-5' ); ?></span><div><strong><?php esc_html_e( 'We pack and ship it', 'skino' ); ?></strong><p><?php esc_html_e( 'Every product is checked before dispatch.', 'skino' ); ?></p></div></li>
					<li><span><?php skino_icon( 'Truck', 'w-5 h-5' ); ?></span><div><strong><?php echo esc_html( sprintf( __( 'Delivered in %s', 'skino' ), $eta ) ); ?></strong><p><?php echo esc_html( isset( $labels[ $loc ] ) ? $labels[ $loc ] . ': ' . $order->get_billing_address_1() : $order->get_billing_address_1() ); ?></p></div></li>
				</ol>
			</section>
		<?php endif; ?>

		<?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
		<?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>

		<div class="skino-thanks-actions">
			<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="skino-btn"><?php esc_html_e( 'Continue shopping', 'skino' ); ?></a>
			<?php if ( is_user_logged_in() ) : ?>
				<a href="<?php echo esc_url( wc_get_account_endpoint_url( 'orders' ) ); ?>" class="skino-btn skino-btn-ghost"><?php esc_html_e( 'View my orders', 'skino' ); ?></a>
			<?php endif; ?>
		</div>
		<p class="skino-thanks-help"><?php echo esc_html( sprintf( __( 'Questions about your order? Call us on %s.', 'skino' ), skino_contact( 'phone' ) ) ); ?></p>
	<?php else : ?>
		<?php wc_get_template( 'checkout/order-received.php', array( 'order' => false ) ); ?>
	<?php endif; ?>
</div>
