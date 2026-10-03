<?php
/**
 * Checkout: single-page version of the React checkout modal.
 *  - Name, phone, email, address and Inside/Outside Dhaka delivery location
 *  - Delivery charge (৳60 / ৳120) added as a cart fee
 *  - Cash on Delivery (WooCommerce built-in) and a bKash gateway that collects the sender number + TxnID
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SKINO_DELIVERY_CHARGES = array(
	'inside'  => 60,
	'outside' => 120,
);

function skino_delivery_labels() {
	return array(
		'inside'  => __( 'Inside Dhaka', 'skino' ),
		'outside' => __( 'Outside Dhaka', 'skino' ),
	);
}

/*
 * New WooCommerce installs create the Cart and Checkout pages with the block editor versions, which ignore the
 * classic checkout-field hooks this theme relies on (delivery location, bKash fields, Dhaka fee).
 * Render the classic shortcodes on those pages regardless of what the page contains.
 */
add_filter( 'the_content', function ( $content ) {
	if ( ! function_exists( 'is_checkout' ) || ! in_the_loop() || ! is_main_query() ) {
		return $content;
	}
	if ( is_checkout() && false !== strpos( $content, 'wp:woocommerce/checkout' ) ) {
		return '[woocommerce_checkout]'; // Also covers the order-received (thank you) endpoint.
	}
	if ( is_cart() && false !== strpos( $content, 'wp:woocommerce/cart' ) ) {
		return '[woocommerce_cart]';
	}
	return $content;
}, 5 );

// Bangladesh-only store; the delivery fee replaces WooCommerce shipping.
add_filter( 'woocommerce_default_country', function () {
	return 'BD';
} );
add_filter( 'woocommerce_cart_needs_shipping', '__return_false' );
add_filter( 'woocommerce_cart_needs_shipping_address', '__return_false' );
add_filter( 'woocommerce_enable_order_notes_field', '__return_false' );
add_filter( 'woocommerce_ship_to_different_address_checked', '__return_false' );

add_filter( 'woocommerce_checkout_fields', function ( $fields ) {
	$b = &$fields['billing'];

	foreach ( array( 'billing_last_name', 'billing_company', 'billing_country', 'billing_address_2', 'billing_city', 'billing_state', 'billing_postcode' ) as $remove ) {
		unset( $b[ $remove ] );
	}
	unset( $fields['shipping'] );

	$b['billing_first_name'] = array_merge( $b['billing_first_name'], array(
		'label'       => __( 'Full Name', 'skino' ),
		'placeholder' => __( 'e.g. Rahim Ahmed', 'skino' ),
		'autocomplete' => 'name',
		'class'       => array( 'form-row-wide' ),
		'priority'    => 10,
	) );
	$b['billing_phone'] = array_merge( $b['billing_phone'], array(
		'label'       => __( 'Phone Number', 'skino' ),
		'placeholder' => '017XXXXXXXX',
		'type'        => 'tel',
		'autocomplete' => 'tel',
		'custom_attributes' => array( 'inputmode' => 'tel' ),
		'required'    => true,
		'class'       => array( 'form-row-wide' ),
		'priority'    => 20,
	) );
	$b['billing_email'] = array_merge( $b['billing_email'], array(
		'label'       => __( 'Email Address', 'skino' ),
		'placeholder' => 'yourname@example.com',
		'autocomplete' => 'email',
		'required'    => true,
		'class'       => array( 'form-row-wide' ),
		'priority'    => 30,
	) );
	$b['billing_address_1'] = array_merge( $b['billing_address_1'], array(
		'label'       => __( 'Delivery Address', 'skino' ),
		'placeholder' => __( 'House, road, area, city', 'skino' ),
		'type'        => 'textarea',
		'autocomplete' => 'street-address',
		'custom_attributes' => array( 'rows' => 2 ),
		'class'       => array( 'form-row-wide' ),
		'priority'    => 40,
	) );
	$b['skino_delivery_location'] = array(
		'type'     => 'radio',
		'label'    => __( 'Delivery Location', 'skino' ),
		'required' => true,
		'class'    => array( 'form-row-wide', 'update_totals_on_change', 'skino-delivery-location' ),
		'options'  => array(
			'inside'  => __( 'Inside Dhaka', 'skino' ),
			'outside' => __( 'Outside Dhaka', 'skino' ),
		),
		'priority' => 50,
	);
	return $fields;
} );

/** Reads the chosen delivery location from the checkout AJAX refresh or the final submit. */
function skino_posted_delivery_location() {
	$value = '';
	// phpcs:disable WordPress.Security.NonceVerification
	if ( isset( $_POST['skino_delivery_location'] ) ) {
		$value = sanitize_key( wp_unslash( $_POST['skino_delivery_location'] ) );
	} elseif ( isset( $_POST['post_data'] ) ) {
		parse_str( wp_unslash( $_POST['post_data'] ), $data );
		$value = isset( $data['skino_delivery_location'] ) ? sanitize_key( $data['skino_delivery_location'] ) : '';
	}
	// phpcs:enable
	return isset( SKINO_DELIVERY_CHARGES[ $value ] ) ? $value : '';
}

add_action( 'woocommerce_cart_calculate_fees', function ( $cart ) {
	if ( is_admin() && ! defined( 'DOING_AJAX' ) ) {
		return;
	}
	if ( ! is_checkout() && ! wp_doing_ajax() ) {
		return;
	}
	$location = skino_posted_delivery_location();
	if ( ! $location ) {
		return;
	}
	$labels = skino_delivery_labels();
	$cart->add_fee( sprintf( __( 'Delivery (%s)', 'skino' ), $labels[ $location ] ), SKINO_DELIVERY_CHARGES[ $location ], false );
} );

add_action( 'woocommerce_after_checkout_validation', function ( $data, $errors ) {
	if ( empty( $data['skino_delivery_location'] ) || ! isset( SKINO_DELIVERY_CHARGES[ $data['skino_delivery_location'] ] ) ) {
		$errors->add( 'skino_delivery_location', __( 'Please choose your delivery location (inside or outside Dhaka).', 'skino' ) );
	}
}, 10, 2 );

add_action( 'woocommerce_checkout_create_order', function ( $order, $data ) {
	$order->set_billing_country( 'BD' );
	if ( ! empty( $data['skino_delivery_location'] ) ) {
		$order->update_meta_data( '_skino_delivery_location', sanitize_key( $data['skino_delivery_location'] ) );
	}
}, 10, 2 );

add_action( 'woocommerce_admin_order_data_after_billing_address', function ( $order ) {
	$labels = skino_delivery_labels();
	$loc    = $order->get_meta( '_skino_delivery_location' );
	if ( $loc && isset( $labels[ $loc ] ) ) {
		echo '<p><strong>' . esc_html__( 'Delivery location:', 'skino' ) . '</strong> ' . esc_html( $labels[ $loc ] ) . '</p>';
	}
	if ( $order->get_meta( '_skino_bkash_txn' ) ) {
		echo '<p><strong>bKash:</strong> ' . esc_html( $order->get_meta( '_skino_bkash_number' ) ) . ' &middot; TxnID ' . esc_html( $order->get_meta( '_skino_bkash_txn' ) ) . '</p>';
	}
} );

// Radio fields: WooCommerce has no built-in renderer for them.
add_filter( 'woocommerce_form_field_radio', function ( $field, $key, $args, $value ) {
	$eta  = array(
		'inside'  => __( 'Arrives in 1 to 2 working days', 'skino' ),
		'outside' => __( 'Arrives in 3 to 5 working days', 'skino' ),
	);
	$html = '<div class="form-row ' . esc_attr( implode( ' ', $args['class'] ) ) . '" id="' . esc_attr( $key ) . '_field"><label class="skino-field-label">' . esc_html( $args['label'] );
	if ( ! empty( $args['required'] ) ) {
		$html .= ' <abbr class="required" title="required">*</abbr>';
	}
	$html .= '</label><div class="skino-loc-grid" role="radiogroup">';
	foreach ( $args['options'] as $option_value => $label ) {
		$id    = $key . '_' . $option_value;
		$price = isset( SKINO_DELIVERY_CHARGES[ $option_value ] ) ? skino_money( SKINO_DELIVERY_CHARGES[ $option_value ] ) : '';
		$html .= '<label for="' . esc_attr( $id ) . '" class="skino-radio-card">';
		$html .= '<input type="radio" class="sr-only" name="' . esc_attr( $key ) . '" id="' . esc_attr( $id ) . '" value="' . esc_attr( $option_value ) . '"' . checked( $value, $option_value, false ) . '>';
		$html .= '<span class="skino-radio-dot" aria-hidden="true"></span>';
		$html .= '<span class="skino-radio-text"><strong>' . esc_html( $label ) . '</strong>';
		$html .= '<small>' . esc_html( isset( $eta[ $option_value ] ) ? $eta[ $option_value ] : '' ) . '</small></span>';
		$html .= '<span class="skino-radio-price">' . esc_html( $price ) . '</span></label>';
	}
	$html .= '</div></div>';
	return $html;
}, 10, 4 );

// Payment heading (printed once, outside the AJAX-refreshed payment block).
add_action( 'woocommerce_review_order_before_payment', function () {
	echo '<h2 class="skino-card-title skino-pay-title"><span class="skino-num">3</span> ' . esc_html__( 'Payment', 'skino' ) . '</h2>';
} );

// The button says what will be charged: "Place order · ৳2,429".
add_filter( 'woocommerce_order_button_text', function ( $text ) {
	if ( function_exists( 'WC' ) && WC()->cart ) {
		return sprintf( __( 'Place order · %s', 'skino' ), skino_money( WC()->cart->get_total( 'edit' ) ) );
	}
	return $text;
} );

// Reassurance right under the button, where hesitation happens.
add_action( 'woocommerce_review_order_after_submit', function () {
	$points = array(
		array( 'Banknote', __( 'Pay in cash when your order arrives', 'skino' ) ),
		array( 'BadgeCheck', __( '100% authentic products', 'skino' ) ),
		array( 'RotateCcw', __( '7-day easy returns', 'skino' ) ),
	);
	echo '<ul class="skino-assure">';
	foreach ( $points as $p ) {
		echo '<li>' . skino_icon( $p[0], 'w-4 h-4', 'none', false ) . ' ' . esc_html( $p[1] ) . '</li>'; // phpcs:ignore WordPress.Security.EscapeOutput
	}
	echo '</ul>';
	echo '<p class="skino-assure-help">' . esc_html( sprintf( __( 'Need help? Call %s', 'skino' ), skino_contact( 'phone' ) ) ) . '</p>';
} );

/* ------------------------------------------------------------------ bKash gateway */
// Themes load after plugins_loaded, so register right away when WooCommerce's gateway base class is available.
if ( class_exists( 'WC_Payment_Gateway' ) ) {
	class Skino_Gateway_Bkash extends WC_Payment_Gateway {
		public function __construct() {
			$this->id                 = 'skino_bkash';
			$this->icon               = skino_asset( 'img/bkash_logo_custom.png' );
			$this->has_fields         = true;
			$this->method_title       = 'bKash (manual)';
			$this->method_description = 'Customers send money to your bKash merchant number and enter their number and the Transaction ID at checkout. You confirm the payment manually before shipping.';
			$this->init_form_fields();
			$this->init_settings();
			$this->title       = $this->get_option( 'title', 'bKash' );
			$this->description = $this->get_option( 'description' );
			add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( $this, 'process_admin_options' ) );
		}

		public function init_form_fields() {
			$this->form_fields = array(
				'enabled'     => array( 'title' => 'Enable/Disable', 'type' => 'checkbox', 'label' => 'Enable bKash payments', 'default' => 'yes' ),
				'title'       => array( 'title' => 'Title', 'type' => 'text', 'default' => 'bKash' ),
				'description' => array( 'title' => 'Description', 'type' => 'textarea', 'default' => 'Mobile banking payment' ),
				'merchant'    => array( 'title' => 'bKash merchant number', 'type' => 'text', 'description' => 'Shown to customers: "Send payment to ...". The React demo used the placeholder 01XXXXXXXXX, replace it with your real number.', 'default' => '01XXXXXXXXX' ),
			);
		}

		public function payment_fields() {
			if ( $this->description ) {
				echo '<p>' . esc_html( $this->description ) . '</p>';
			}
			?>
			<div class="skino-bkash-box">
				<p class="skino-bkash-send">📱 <?php esc_html_e( 'Send payment to:', 'skino' ); ?> <strong><?php echo esc_html( $this->get_option( 'merchant', '01XXXXXXXXX' ) ); ?></strong> (Merchant)</p>
				<p class="form-row form-row-wide">
					<label for="skino_bkash_number"><?php esc_html_e( 'Your bKash Number', 'skino' ); ?> <abbr class="required">*</abbr></label>
					<input type="tel" class="input-text" name="skino_bkash_number" id="skino_bkash_number" placeholder="01XXXXXXXXX" autocomplete="tel">
				</p>
				<p class="form-row form-row-wide">
					<label for="skino_bkash_txn"><?php esc_html_e( 'Transaction ID (TxnID)', 'skino' ); ?> <abbr class="required">*</abbr></label>
					<input type="text" class="input-text" name="skino_bkash_txn" id="skino_bkash_txn" placeholder="e.g. AB12345678" autocomplete="off">
				</p>
			</div>
			<?php
		}

		public function validate_fields() {
			// phpcs:disable WordPress.Security.NonceVerification
			$number = isset( $_POST['skino_bkash_number'] ) ? sanitize_text_field( wp_unslash( $_POST['skino_bkash_number'] ) ) : '';
			$txn    = isset( $_POST['skino_bkash_txn'] ) ? sanitize_text_field( wp_unslash( $_POST['skino_bkash_txn'] ) ) : '';
			// phpcs:enable
			if ( ! $number || ! $txn ) {
				wc_add_notice( __( 'Please enter your bKash number and Transaction ID.', 'skino' ), 'error' );
				return false;
			}
			return true;
		}

		public function process_payment( $order_id ) {
			$order = wc_get_order( $order_id );
			// phpcs:disable WordPress.Security.NonceVerification
			$order->update_meta_data( '_skino_bkash_number', sanitize_text_field( wp_unslash( $_POST['skino_bkash_number'] ?? '' ) ) );
			$order->update_meta_data( '_skino_bkash_txn', sanitize_text_field( wp_unslash( $_POST['skino_bkash_txn'] ?? '' ) ) );
			// phpcs:enable
			$order->update_status( 'on-hold', __( 'Awaiting manual bKash payment confirmation.', 'skino' ) );
			wc_reduce_stock_levels( $order_id );
			WC()->cart->empty_cart();
			return array(
				'result'   => 'success',
				'redirect' => $this->get_return_url( $order ),
			);
		}
	}

	add_filter( 'woocommerce_payment_gateways', function ( $gateways ) {
		$gateways[] = 'Skino_Gateway_Bkash';
		return $gateways;
	} );
}
