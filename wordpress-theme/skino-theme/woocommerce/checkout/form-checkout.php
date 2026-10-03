<?php
/**
 * Checkout page: three clear sections (contact, delivery, payment) beside a live order summary.
 * Overrides woocommerce/checkout/form-checkout.php; all WooCommerce hooks are kept so plugins and AJAX keep working.
 *
 * @var WC_Checkout $checkout
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
	echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
	return;
}

$billing = $checkout->get_checkout_fields( 'billing' );
$groups  = array(
	'contact'  => array( 'billing_first_name', 'billing_phone', 'billing_email' ),
	'delivery' => array( 'billing_address_1', 'skino_delivery_location' ),
);
$used    = array_merge( $groups['contact'], $groups['delivery'] );
$extra   = array_diff( array_keys( $billing ), $used ); // Fields added by plugins land in the delivery card.

$field = function ( $key ) use ( $billing, $checkout ) {
	if ( isset( $billing[ $key ] ) ) {
		woocommerce_form_field( $key, $billing[ $key ], $checkout->get_value( $key ) );
	}
};
?>
<div class="skino-checkout">
	<header class="skino-co-head">
		<h1><?php skino_icon( 'Lock', 'w-6 h-6' ); ?> <?php esc_html_e( 'Secure checkout', 'skino' ); ?></h1>
		<p><?php esc_html_e( 'It takes about a minute. You can pay when your order arrives.', 'skino' ); ?></p>
		<ol class="skino-steps" aria-label="<?php esc_attr_e( 'Checkout progress', 'skino' ); ?>">
			<li class="is-done"><span><?php skino_icon( 'Check', 'w-3.5 h-3.5' ); ?></span> <?php esc_html_e( 'Cart', 'skino' ); ?></li>
			<li class="is-current"><span>2</span> <?php esc_html_e( 'Your details', 'skino' ); ?></li>
			<li><span>3</span> <?php esc_html_e( 'Order placed', 'skino' ); ?></li>
		</ol>
	</header>

	<?php do_action( 'woocommerce_before_checkout_form', $checkout ); ?>

	<form name="checkout" method="post" class="checkout woocommerce-checkout skino-co-grid" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" aria-label="<?php echo esc_attr__( 'Checkout', 'woocommerce' ); ?>">
		<?php if ( $checkout->get_checkout_fields() ) : ?>
			<div class="skino-co-main" id="customer_details">
				<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

				<section class="skino-card">
					<h2 class="skino-card-title"><span class="skino-num">1</span> <?php esc_html_e( 'Contact', 'skino' ); ?></h2>
					<?php do_action( 'woocommerce_before_checkout_billing_form', $checkout ); ?>
					<div class="skino-fields">
						<?php foreach ( $groups['contact'] as $key ) { $field( $key ); } ?>
					</div>
					<p class="skino-hint"><?php skino_icon( 'Phone', 'w-3.5 h-3.5' ); ?> <?php esc_html_e( 'We may call this number to confirm your order and delivery time.', 'skino' ); ?></p>

					<?php if ( ! is_user_logged_in() && $checkout->is_registration_enabled() ) : ?>
						<div class="woocommerce-account-fields skino-account-opt">
							<?php if ( ! $checkout->is_registration_required() ) : ?>
								<p class="form-row form-row-wide create-account">
									<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
										<input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" id="createaccount" <?php checked( ( true === $checkout->get_value( 'createaccount' ) || ( true === apply_filters( 'woocommerce_create_account_default_checked', false ) ) ), true ); ?> type="checkbox" name="createaccount" value="1" />
										<span><?php esc_html_e( 'Create an account to track this order and check out faster next time', 'skino' ); ?></span>
									</label>
								</p>
							<?php endif; ?>
							<?php do_action( 'woocommerce_before_checkout_registration_form', $checkout ); ?>
							<?php if ( $checkout->get_checkout_fields( 'account' ) ) : ?>
								<div class="create-account">
									<?php foreach ( $checkout->get_checkout_fields( 'account' ) as $key => $account_field ) { woocommerce_form_field( $key, $account_field, $checkout->get_value( $key ) ); } ?>
								</div>
							<?php endif; ?>
							<?php do_action( 'woocommerce_after_checkout_registration_form', $checkout ); ?>
						</div>
					<?php endif; ?>
				</section>

				<section class="skino-card">
					<h2 class="skino-card-title"><span class="skino-num">2</span> <?php esc_html_e( 'Delivery', 'skino' ); ?></h2>
					<div class="skino-fields">
						<?php foreach ( array_merge( $groups['delivery'], $extra ) as $key ) { $field( $key ); } ?>
					</div>
					<?php do_action( 'woocommerce_after_checkout_billing_form', $checkout ); ?>
				</section>

				<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
			</div>
		<?php endif; ?>

		<aside class="skino-co-side">
			<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
			<section class="skino-card skino-summary-card">
				<h2 class="skino-card-title"><?php esc_html_e( 'Your order', 'skino' ); ?>
					<button type="button" data-cart-open class="skino-edit-cart"><?php esc_html_e( 'Edit cart', 'skino' ); ?></button>
				</h2>
				<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>
				<div id="order_review" class="woocommerce-checkout-review-order">
					<?php do_action( 'woocommerce_checkout_order_review' ); ?>
				</div>
				<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>
			</section>
		</aside>
	</form>
</div>
<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
