<?php
/**
 * My Account > Addresses: the same four details the checkout asks for, instead of WooCommerce's international
 * address form (country/district dropdowns, postcode, apartment, last name).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Billing fields inside My Account only. get_address_fields() applies this filter both when the form is drawn and
 * when it is saved, so display and validation always agree. (The checkout trims its own fields separately.)
 */
add_filter( 'woocommerce_billing_fields', function ( $fields ) {
	if ( ! function_exists( 'is_account_page' ) || ! is_account_page() ) {
		return $fields;
	}
	foreach ( array( 'billing_last_name', 'billing_company', 'billing_country', 'billing_address_2', 'billing_city', 'billing_state', 'billing_postcode' ) as $remove ) {
		unset( $fields[ $remove ] );
	}
	if ( isset( $fields['billing_first_name'] ) ) {
		$fields['billing_first_name'] = array_merge( $fields['billing_first_name'], array(
			'label'        => __( 'Full name', 'skino' ),
			'placeholder'  => __( 'e.g. Rahim Ahmed', 'skino' ),
			'autocomplete' => 'name',
			'class'        => array( 'form-row-wide' ),
			'priority'     => 10,
		) );
	}
	if ( isset( $fields['billing_phone'] ) ) {
		$fields['billing_phone'] = array_merge( $fields['billing_phone'], array(
			'label'             => __( 'Phone number', 'skino' ),
			'placeholder'       => '017XXXXXXXX',
			'type'              => 'tel',
			'autocomplete'      => 'tel',
			'custom_attributes' => array( 'inputmode' => 'tel' ),
			'required'          => true,
			'class'             => array( 'form-row-wide' ),
			'priority'          => 20,
		) );
	}
	if ( isset( $fields['billing_email'] ) ) {
		$fields['billing_email'] = array_merge( $fields['billing_email'], array(
			'label'        => __( 'Email address', 'skino' ),
			'autocomplete' => 'email',
			'class'        => array( 'form-row-wide' ),
			'priority'     => 30,
		) );
	}
	if ( isset( $fields['billing_address_1'] ) ) {
		$fields['billing_address_1'] = array_merge( $fields['billing_address_1'], array(
			'label'             => __( 'Delivery address', 'skino' ),
			'placeholder'       => __( 'House, road, area, city', 'skino' ),
			'type'              => 'textarea',
			'autocomplete'      => 'street-address',
			'custom_attributes' => array( 'rows' => 3 ),
			'class'             => array( 'form-row-wide' ),
			'priority'          => 40,
		) );
	}
	return $fields;
}, 99 );

// WooCommerce refuses to save an address form that has no country value, so send it as a hidden field.
add_action( 'woocommerce_before_edit_address_form_billing', function () {
	echo '<input type="hidden" name="billing_country" value="BD">';
} );

// Shipping address is not used (delivery goes to the details above), so hide that card and rename the billing one.
add_filter( 'woocommerce_my_account_get_addresses', function ( $addresses ) {
	unset( $addresses['shipping'] );
	if ( isset( $addresses['billing'] ) ) {
		$addresses['billing'] = __( 'Delivery details', 'skino' );
	}
	return $addresses;
} );
add_filter( 'woocommerce_my_account_edit_address_title', function ( $title, $load_address ) {
	return 'billing' === $load_address ? __( 'Delivery details', 'skino' ) : $title;
}, 10, 2 );

// "Delivery details" heading + "Edit Delivery details" link repeats itself: make the link just "Edit" / "Add".
add_filter( 'gettext', function ( $translated, $text, $domain ) {
	if ( 'woocommerce' === $domain && function_exists( 'is_account_page' ) && is_account_page() ) {
		if ( 'Edit %s' === $text ) {
			return __( 'Edit', 'skino' );
		}
		if ( 'Add %s' === $text ) {
			return __( 'Add', 'skino' );
		}
	}
	return $translated;
}, 10, 3 );
