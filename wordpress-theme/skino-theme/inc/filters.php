<?php
/**
 * Combined Category + Brand filtering for the catalogue sidebar.
 *
 * URLs stay pretty where possible (/product-category/skin-care/?product_brand=cosrx). WordPress applies both
 * taxonomy query vars natively, so no extra query code is needed.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Currently selected category / brand slugs (from the archive itself or the query string). */
function skino_active_filters() {
	$brand_tax = skino_brand_taxonomy();
	// Both taxonomies expose their slug as a query var, whether it came from the pretty URL or the query string.
	// (get_queried_object() only reports one of them when two filters are combined.)
	$cat   = get_query_var( 'product_cat' );
	$brand = get_query_var( $brand_tax );
	$cat   = is_string( $cat ) ? sanitize_title( strtok( $cat, ',' ) ) : '';
	$brand = is_string( $brand ) ? sanitize_title( strtok( $brand, ',' ) ) : '';
	return array( 'cat' => $cat, 'brand' => $brand );
}

/** URL for a given category/brand combination, keeping sort order and any search. */
function skino_filter_url( $cat, $brand ) {
	$brand_tax = skino_brand_taxonomy();
	$args      = array();
	// phpcs:disable WordPress.Security.NonceVerification
	if ( ! empty( $_GET['orderby'] ) ) {
		$args['orderby'] = sanitize_key( wp_unslash( $_GET['orderby'] ) );
	}
	// phpcs:enable

	if ( is_search() ) {
		$args['s']         = get_search_query( false );
		$args['post_type'] = 'product';
		if ( $cat ) {
			$args['product_cat'] = $cat;
		}
		if ( $brand ) {
			$args[ $brand_tax ] = $brand;
		}
		return add_query_arg( array_map( 'rawurlencode', $args ), home_url( '/' ) );
	}

	if ( $cat ) {
		$base = get_term_link( $cat, 'product_cat' );
		if ( $brand ) {
			$args[ $brand_tax ] = $brand;
		}
	} elseif ( $brand ) {
		$base = get_term_link( $brand, $brand_tax );
	} else {
		$base = wc_get_page_permalink( 'shop' );
	}
	if ( is_wp_error( $base ) ) {
		$base = wc_get_page_permalink( 'shop' );
	}
	return $args ? add_query_arg( $args, $base ) : $base;
}

/** Product ids matching the given category and/or brand (either may be empty). */
function skino_filtered_ids( $cat, $brand ) {
	$tax = array();
	if ( $cat ) {
		$tax[] = array( 'taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => $cat );
	}
	if ( $brand ) {
		$tax[] = array( 'taxonomy' => skino_brand_taxonomy(), 'field' => 'slug', 'terms' => $brand );
	}
	$args = array(
		'post_type'      => 'product',
		'post_status'    => 'publish',
		'fields'         => 'ids',
		'posts_per_page' => -1,
		'no_found_rows'  => true,
	);
	if ( count( $tax ) > 1 ) {
		$tax['relation'] = 'AND';
	}
	if ( $tax ) {
		$args['tax_query'] = $tax; // phpcs:ignore WordPress.DB.SlowDBQuery
	}
	// A search narrows the facets too.
	if ( is_search() ) {
		$args['s'] = get_search_query( false );
	}
	return get_posts( $args );
}

/** term_id => count of the given product ids that carry the term. */
function skino_facet_counts( array $ids, $taxonomy ) {
	if ( ! $ids ) {
		return array();
	}
	$rows   = wp_get_object_terms( $ids, $taxonomy, array( 'fields' => 'all_with_object_id' ) );
	$counts = array();
	if ( is_wp_error( $rows ) ) {
		return $counts;
	}
	foreach ( $rows as $row ) {
		$counts[ $row->term_id ] = isset( $counts[ $row->term_id ] ) ? $counts[ $row->term_id ] + 1 : 1;
	}
	return $counts;
}

/**
 * Sidebar sections: Category and Brand. Each facet is counted against the *other* filter, so the numbers always
 * match what the customer will see after clicking.
 */
function skino_filter_sections() {
	$brand_tax = skino_brand_taxonomy();
	$active    = skino_active_filters();
	$sections  = array();

	$defs = array(
		'cat'   => array( 'taxonomy' => 'product_cat', 'title' => __( 'Category', 'skino' ), 'other' => 'brand', 'order' => 'count' ),
		'brand' => array( 'taxonomy' => $brand_tax, 'title' => __( 'Brand', 'skino' ), 'other' => 'cat', 'order' => 'name' ),
	);

	foreach ( $defs as $key => $def ) {
		if ( ! taxonomy_exists( $def['taxonomy'] ) ) {
			continue;
		}
		$other_args = array( 'cat' => '', 'brand' => '' );
		$other_args[ $def['other'] ] = $active[ $def['other'] ];
		$counts = skino_facet_counts( skino_filtered_ids( $other_args['cat'], $other_args['brand'] ), $def['taxonomy'] );

		$terms = get_terms( array( 'taxonomy' => $def['taxonomy'], 'hide_empty' => true ) );
		if ( is_wp_error( $terms ) ) {
			continue;
		}
		$items = array();
		foreach ( $terms as $t ) {
			if ( 'uncategorized' === $t->slug ) {
				continue;
			}
			$is_active = $active[ $key ] === $t->slug;
			$count     = isset( $counts[ $t->term_id ] ) ? $counts[ $t->term_id ] : 0;
			if ( ! $count && ! $is_active ) {
				continue; // Would lead to an empty page.
			}
			$next = $active;
			$next[ $key ] = $is_active ? '' : $t->slug; // Clicking the active item clears it.
			$items[] = array(
				'label'  => $t->name,
				'url'    => skino_filter_url( $next['cat'], $next['brand'] ),
				'count'  => $count,
				'active' => $is_active,
			);
		}
		usort( $items, function ( $a, $b ) use ( $def ) {
			return 'name' === $def['order'] ? strcasecmp( $a['label'], $b['label'] ) : ( $b['count'] <=> $a['count'] ?: strcasecmp( $a['label'], $b['label'] ) );
		} );
		$sections[] = array( 'key' => $key, 'title' => $def['title'], 'items' => $items, 'has_active' => (bool) $active[ $key ] );
	}
	return $sections;
}

/** Readable heading for the current selection, e.g. "Skin Care · Cosrx". */
function skino_filter_heading() {
	$active = skino_active_filters();
	$parts  = array();
	if ( $active['cat'] ) {
		$t = get_term_by( 'slug', $active['cat'], 'product_cat' );
		$parts[] = $t ? $t->name : $active['cat'];
	}
	if ( $active['brand'] ) {
		$t = get_term_by( 'slug', $active['brand'], skino_brand_taxonomy() );
		$parts[] = $t ? $t->name : $active['brand'];
	}
	return implode( ' · ', $parts );
}
