<?php
/**
 * One-time setup when the theme is activated.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_switch_theme', function () {
	// Pretty permalinks (needed for /sale/... and /product-category/...).
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}

	// Static front page + wishlist page.
	$home = get_page_by_path( 'home' );
	if ( ! $home ) {
		$id = wp_insert_post( array( 'post_title' => 'Home', 'post_name' => 'home', 'post_status' => 'publish', 'post_type' => 'page' ) );
	} else {
		$id = $home->ID;
	}
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $id );

	if ( ! get_page_by_path( 'wishlist' ) ) {
		wp_insert_post( array( 'post_title' => 'My Wishlist', 'post_name' => 'wishlist', 'post_status' => 'publish', 'post_type' => 'page' ) );
	}

	// Store currency and delivery country.
	if ( class_exists( 'WooCommerce' ) ) {
		update_option( 'woocommerce_currency', 'BDT' );
		update_option( 'woocommerce_default_country', 'BD' );
		update_option( 'woocommerce_cod_settings', array_merge( (array) get_option( 'woocommerce_cod_settings', array() ), array( 'enabled' => 'yes', 'title' => 'Cash on Delivery', 'description' => 'Pay when you receive your order' ) ) );
	}

	flush_rewrite_rules();
} );

// Whole-taka prices, as in the React design (no ".00").
add_filter( 'wc_get_price_decimals', '__return_zero' );

// Use the Taka symbol used throughout the React design.
add_filter( 'woocommerce_currency_symbol', function ( $symbol, $currency ) {
	return 'BDT' === $currency ? '৳' : $symbol;
}, 10, 2 );
