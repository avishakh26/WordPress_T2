<?php
/**
 * Command-line product import (alternative to WooCommerce > Products > Import):
 *   wp eval-file import-products.php /import/skino-products.csv
 * Idempotent: products are matched by SKU, so it is safe to run twice.
 */
if ( ! defined( 'ABSPATH' ) || ! class_exists( 'WooCommerce' ) ) {
	exit( "Run with wp eval-file while WooCommerce is active.\n" );
}

$file = isset( $args[0] ) ? $args[0] : '/import/skino-products.csv';
$fh   = fopen( $file, 'r' );
if ( ! $fh ) {
	exit( "Cannot open $file\n" );
}

// The CSV starts with a UTF-8 BOM (so Excel opens it correctly): skip it before parsing quoted headers.
if ( "\xEF\xBB\xBF" !== fread( $fh, 3 ) ) {
	rewind( $fh );
}
$header = fgetcsv( $fh );
$brand_tax = taxonomy_exists( 'product_brand' ) ? 'product_brand' : null;

$created = $updated = 0;
while ( ( $row = fgetcsv( $fh ) ) !== false ) {
	$d   = array_combine( $header, $row );
	$id  = wc_get_product_id_by_sku( $d['SKU'] );
	$p   = $id ? wc_get_product( $id ) : new WC_Product_Simple();

	$p->set_name( $d['Name'] );
	$p->set_sku( $d['SKU'] );
	$p->set_status( 'publish' );
	$p->set_short_description( $d['Short description'] );
	$p->set_regular_price( $d['Regular price'] );
	$p->set_sale_price( $d['Sale price'] );
	$p->set_manage_stock( false );
	$p->set_stock_status( 'instock' );
	$p->set_reviews_allowed( true );
	$p->update_meta_data( '_skino_rating', $d['Meta: _skino_rating'] );
	$p->update_meta_data( '_skino_review_count', $d['Meta: _skino_review_count'] );

	$cat = term_exists( $d['Categories'], 'product_cat' );
	if ( ! $cat ) {
		$cat = wp_insert_term( $d['Categories'], 'product_cat' );
	}
	if ( ! is_wp_error( $cat ) ) {
		$p->set_category_ids( array( (int) ( is_array( $cat ) ? $cat['term_id'] : $cat ) ) );
	}
	$p->save();

	if ( $brand_tax && $d['Brands'] ) {
		wp_set_object_terms( $p->get_id(), $d['Brands'], $brand_tax );
	}
	$id ? $updated++ : $created++;
}
fclose( $fh );
echo "Created $created, updated $updated products.\n";
