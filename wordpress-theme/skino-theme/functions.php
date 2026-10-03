<?php
/**
 * Skino Beauty Shop theme bootstrap.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SKINO_VERSION', '1.1.1' );
define( 'SKINO_DIR', get_template_directory() );
define( 'SKINO_URI', get_template_directory_uri() );
// Products per page on category, brand, search and sale pages.
define( 'SKINO_PER_PAGE', 16 );
// Products per page on the K-Beauty, Clearance and J-Beauty sale pages (5 x 4 on wide screens).
define( 'SKINO_SALE_PER_PAGE', 20 );

require_once SKINO_DIR . '/inc/icons.php';
require_once SKINO_DIR . '/inc/helpers.php';
require_once SKINO_DIR . '/inc/woocommerce.php';
require_once SKINO_DIR . '/inc/filters.php';
require_once SKINO_DIR . '/inc/ajax.php';
require_once SKINO_DIR . '/inc/checkout.php';
require_once SKINO_DIR . '/inc/account.php';
require_once SKINO_DIR . '/inc/sale.php';
require_once SKINO_DIR . '/inc/setup.php';

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array( 'height' => 60, 'width' => 200, 'flex-width' => true, 'flex-height' => true ) );
	add_theme_support( 'woocommerce' );
	register_nav_menus( array(
		'footer' => __( 'Footer quick links', 'skino' ),
	) );
} );

add_action( 'wp_enqueue_scripts', function () {
	$css = SKINO_DIR . '/assets/css/app.css';
	$js  = SKINO_DIR . '/assets/js/app.js';
	wp_enqueue_style( 'skino-swiper', SKINO_URI . '/assets/css/swiper-bundle.min.css', array(), '12' );
	wp_enqueue_style( 'skino-app', SKINO_URI . '/assets/css/app.css', array( 'skino-swiper' ), file_exists( $css ) ? filemtime( $css ) : SKINO_VERSION );
	wp_enqueue_script( 'skino-swiper', SKINO_URI . '/assets/js/swiper-bundle.min.js', array(), '12', true );
	wp_enqueue_script( 'skino-app', SKINO_URI . '/assets/js/app.js', array( 'skino-swiper' ), file_exists( $js ) ? filemtime( $js ) : SKINO_VERSION, true );
	wp_localize_script( 'skino-app', 'SKINO', array(
		'ajax'     => admin_url( 'admin-ajax.php' ),
		'nonce'    => wp_create_nonce( 'skino' ),
		'checkout' => function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : '',
	) );
}, 20 );

// Start loading the main Inter file early so text does not jump when it swaps in.
add_action( 'wp_head', function () {
	printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( SKINO_URI . '/assets/fonts/inter-latin-wght-normal.woff2' ) );
}, 1 );

// WooCommerce's own stylesheets fight with the theme's design; the theme styles WC markup itself.
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

/*
 * After the theme is updated, forget WooCommerce's remembered template locations. Hosts with a persistent object
 * cache (WordPress.com among them) otherwise keep serving the default WooCommerce template for any file that did not
 * exist yet when it was first looked up, so new overrides (login, checkout, ...) would appear to "do nothing".
 */
add_action( 'init', function () {
	if ( get_option( 'skino_theme_version' ) === SKINO_VERSION ) {
		return;
	}
	if ( function_exists( 'wc_clear_template_cache' ) ) {
		wc_clear_template_cache();
	}
	update_option( 'skino_theme_version', SKINO_VERSION, false );
}, 20 );

/*
 * Always use this theme's WooCommerce template overrides, whatever the host's object cache remembers.
 * wc_get_template() caches each template's location; on hosts with a persistent cache that cache can keep pointing at
 * WooCommerce's default file for a template that did not exist when it was first looked up. This filter runs after
 * that lookup and swaps in the theme's file when there is one.
 */
add_filter( 'wc_get_template', function ( $template, $template_name ) {
	$override = SKINO_DIR . '/woocommerce/' . ltrim( $template_name, '/' );
	return file_exists( $override ) ? $override : $template;
}, 10, 2 );
