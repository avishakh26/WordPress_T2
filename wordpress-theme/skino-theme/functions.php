<?php
/**
 * Skino Beauty Shop theme bootstrap.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SKINO_VERSION', '1.0.0' );
define( 'SKINO_DIR', get_template_directory() );
define( 'SKINO_URI', get_template_directory_uri() );

require_once SKINO_DIR . '/inc/icons.php';
require_once SKINO_DIR . '/inc/helpers.php';
require_once SKINO_DIR . '/inc/woocommerce.php';
require_once SKINO_DIR . '/inc/ajax.php';
require_once SKINO_DIR . '/inc/checkout.php';
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

// WooCommerce's own stylesheets fight with the theme's design; the theme styles WC markup itself.
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
