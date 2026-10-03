<?php
/**
 * AJAX endpoints: cart drawer, live search suggestions and the browser-side wishlist.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function skino_ajax_guard() {
	if ( ! function_exists( 'WC' ) ) {
		wp_send_json_error( array( 'message' => 'WooCommerce is not active.' ), 400 );
	}
	if ( ! check_ajax_referer( 'skino', 'nonce', false ) ) {
		wp_send_json_error( array( 'message' => 'Session expired, please reload the page.' ), 403 );
	}
	if ( null === WC()->cart && function_exists( 'wc_load_cart' ) ) {
		wc_load_cart();
	}
}

function skino_cart_response( $extra = array() ) {
	WC()->cart->calculate_totals();
	wp_send_json_success( array_merge( array(
		'html'  => skino_cart_drawer_inner(),
		'count' => skino_cart_count(),
	), $extra ) );
}

function skino_ajax_cart_get() {
	skino_ajax_guard();
	skino_cart_response();
}
add_action( 'wp_ajax_skino_cart_get', 'skino_ajax_cart_get' );
add_action( 'wp_ajax_nopriv_skino_cart_get', 'skino_ajax_cart_get' );

function skino_ajax_cart_add() {
	skino_ajax_guard();
	$product_id = isset( $_POST['product_id'] ) ? absint( $_POST['product_id'] ) : 0;
	$quantity   = isset( $_POST['quantity'] ) ? max( 1, min( 10, absint( $_POST['quantity'] ) ) ) : 1;
	$buy_now    = ! empty( $_POST['buy_now'] );
	$product    = wc_get_product( $product_id );

	if ( ! $product || ! $product->is_purchasable() || ! $product->is_in_stock() ) {
		wp_send_json_error( array( 'message' => 'This product cannot be added to the cart.' ), 400 );
	}

	$existing = WC()->cart->find_product_in_cart( WC()->cart->generate_cart_id( $product_id ) );
	if ( $buy_now && $existing ) {
		// Buy Now checks out exactly the chosen quantity instead of adding to an earlier one.
		WC()->cart->set_quantity( $existing, $quantity, true );
	} else {
		WC()->cart->add_to_cart( $product_id, $quantity );
	}
	skino_cart_response( array( 'buy_now' => $buy_now ) );
}
add_action( 'wp_ajax_skino_cart_add', 'skino_ajax_cart_add' );
add_action( 'wp_ajax_nopriv_skino_cart_add', 'skino_ajax_cart_add' );

function skino_ajax_cart_update() {
	skino_ajax_guard();
	$key = isset( $_POST['key'] ) ? wc_clean( wp_unslash( $_POST['key'] ) ) : '';
	$qty = isset( $_POST['quantity'] ) ? absint( $_POST['quantity'] ) : 0;
	if ( $key && WC()->cart->get_cart_item( $key ) ) {
		if ( $qty < 1 ) {
			WC()->cart->remove_cart_item( $key );
		} else {
			WC()->cart->set_quantity( $key, min( 99, $qty ), true );
		}
	}
	skino_cart_response();
}
add_action( 'wp_ajax_skino_cart_update', 'skino_ajax_cart_update' );
add_action( 'wp_ajax_nopriv_skino_cart_update', 'skino_ajax_cart_update' );

/** Header search suggestions: up to 5 matching products. */
function skino_ajax_search() {
	if ( ! function_exists( 'wc_get_product' ) ) {
		wp_send_json_success( array() );
	}
	$term = isset( $_GET['q'] ) ? sanitize_text_field( wp_unslash( $_GET['q'] ) ) : '';
	if ( strlen( $term ) < 2 ) {
		wp_send_json_success( array() );
	}
	$query = new WP_Query( array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		's'                   => $term,
		'posts_per_page'      => 5,
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	) );
	$out = array();
	foreach ( $query->posts as $post ) {
		$p = wc_get_product( $post );
		if ( ! $p ) {
			continue;
		}
		$out[] = array(
			'title' => $p->get_name(),
			'url'   => get_permalink( $post ),
			'image' => skino_product_image_url( $p, 'woocommerce_thumbnail' ),
			'price' => skino_money( $p->get_price() ),
			'old'   => $p->is_on_sale() ? skino_money( $p->get_regular_price() ) : '',
		);
	}
	wp_send_json_success( $out );
}
add_action( 'wp_ajax_skino_search', 'skino_ajax_search' );
add_action( 'wp_ajax_nopriv_skino_search', 'skino_ajax_search' );

/** Renders the wishlist page's product cards for the ids stored in the visitor's browser. */
function skino_ajax_wishlist() {
	$ids = isset( $_GET['ids'] ) ? array_filter( array_map( 'absint', explode( ',', wp_unslash( $_GET['ids'] ) ) ) ) : array();
	$ids = array_slice( array_unique( $ids ), 0, 100 );
	ob_start();
	foreach ( $ids as $id ) {
		$p = wc_get_product( $id );
		if ( $p && 'publish' === get_post_status( $id ) ) {
			skino_product_card( $p );
		}
	}
	wp_send_json_success( array( 'html' => ob_get_clean() ) );
}
add_action( 'wp_ajax_skino_wishlist', 'skino_ajax_wishlist' );
add_action( 'wp_ajax_nopriv_skino_wishlist', 'skino_ajax_wishlist' );
