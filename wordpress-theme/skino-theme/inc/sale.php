<?php
/**
 * /sale/{k-beauty|clearance|j-beauty}/ pages (ported from SalePage.jsx).
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function skino_sales() {
	return array(
		'k-beauty'  => array(
			'title'    => 'K-Beauty Sale',
			'subtitle' => 'Korean skincare favourites from COSRX, LANEIGE and Medicube',
			'gradient' => 'from-[#FF007F] to-[#ff5fae]',
		),
		'clearance' => array(
			'title'    => 'Clearance Sale',
			'subtitle' => 'Biggest price drops across the store. 30% off or more, while stock lasts',
			'gradient' => 'from-[#D30000] to-[#ff5a3c]',
		),
		'j-beauty'  => array(
			'title'    => 'J-Beauty Sale',
			'subtitle' => 'Light, layered skincare rituals: cleansers, essences, toners, sunscreens and masks',
			'gradient' => 'from-[#7800D7] to-[#a855f7]',
		),
	);
}

/** Does this product belong in the given sale? */
function skino_in_sale( $sale, $product ) {
	switch ( $sale ) {
		case 'k-beauty':
			$brands = wp_get_post_terms( $product->get_id(), skino_brand_taxonomy(), array( 'fields' => 'slugs' ) );
			return ! is_wp_error( $brands ) && array_intersect( $brands, array( 'cosrx', 'laneige', 'medicube' ) );
		case 'clearance':
			return skino_discount_percent( $product ) >= 30;
		case 'j-beauty':
			return has_term( 'Skin Care', 'product_cat', $product->get_id() )
				&& preg_match( '/cleanser|essence|toner|sunscreen|mask|serum/i', $product->get_name() );
	}
	return false;
}

add_action( 'init', function () {
	add_rewrite_rule( '^sale/([^/]+)/?$', 'index.php?skino_sale=$matches[1]', 'top' );
} );

add_filter( 'query_vars', function ( $vars ) {
	$vars[] = 'skino_sale';
	return $vars;
} );

add_filter( 'template_include', function ( $template ) {
	$slug = get_query_var( 'skino_sale' );
	if ( $slug ) {
		if ( ! isset( skino_sales()[ $slug ] ) ) {
			global $wp_query;
			$wp_query->set_404();
			status_header( 404 );
			return get_404_template();
		}
		return SKINO_DIR . '/template-sale.php';
	}
	return $template;
} );

add_filter( 'pre_get_document_title', function ( $title ) {
	$slug = get_query_var( 'skino_sale' );
	$all  = skino_sales();
	return ( $slug && isset( $all[ $slug ] ) ) ? $all[ $slug ]['title'] . ' - ' . get_bloginfo( 'name' ) : $title;
} );
