<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Top-level shop categories shown in the header nav: label => category name. */
function skino_nav_categories() {
	return array(
		'MAKEUP'      => 'Makeup',
		'SKIN CARE'   => 'Skin Care',
		'HAIR CARE'   => 'Hair Care',
		'BODY CARE'   => 'Body Care',
		'ACCESSORIES' => 'Accessories',
	);
}

function skino_top_brands() {
	return array( 'Anua', 'Centella', 'Cosrx', 'Everly', 'Lily', 'Medicube', 'Nior', 'Sheglam', 'Swish Beauty', 'Mars', 'Celimax', 'Trendy Beauty', 'Beauty Glazed', 'Simple', 'Skino', 'Pastel Beauty', 'Imagic', 'Sunsilk', 'Dot & Key' );
}

/** WooCommerce 9.6+ ships a native "product_brand" taxonomy; older versions get a theme-registered one. */
function skino_brand_taxonomy() {
	return taxonomy_exists( 'product_brand' ) ? 'product_brand' : 'skino_brand';
}

/** URL of a product category by its name (falls back to the shop page). */
function skino_category_url( $name ) {
	$term = get_term_by( 'name', $name, 'product_cat' );
	if ( $term && ! is_wp_error( $term ) ) {
		$link = get_term_link( $term );
		if ( ! is_wp_error( $link ) ) {
			return $link;
		}
	}
	return function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : home_url( '/' );
}

/** URL of a brand archive by display name. */
function skino_brand_url( $name ) {
	$term = get_term_by( 'slug', sanitize_title( $name ), skino_brand_taxonomy() );
	if ( $term && ! is_wp_error( $term ) ) {
		$link = get_term_link( $term );
		if ( ! is_wp_error( $link ) ) {
			return $link;
		}
	}
	return add_query_arg( array( 's' => rawurlencode( $name ), 'post_type' => 'product' ), home_url( '/' ) );
}

function skino_sale_url( $slug ) {
	return home_url( '/sale/' . $slug . '/' );
}

function skino_asset( $path ) {
	return SKINO_URI . '/assets/' . ltrim( $path, '/' );
}

function skino_money( $n ) {
	return '৳' . number_format_i18n( (float) $n, 0 );
}

/** Category family used for copy and photography on product pages (ported from data/landing.js). */
function skino_family( $category_name ) {
	$map = array(
		'Skin Care' => 'skin', 'Acne Care' => 'skin', 'Anti Aging' => 'skin', 'Combination Skin' => 'skin', 'Dull Skin' => 'skin',
		'Oil Control' => 'skin', 'Sensitive Skin' => 'skin', 'Skin Dryness' => 'skin', 'Spot Treatment' => 'skin',
		'Makeup' => 'makeup', 'Hair Care' => 'hair', 'Hairfall' => 'hair', 'Dandruff' => 'hair',
		'Fragrance' => 'fragrance', 'Body Care' => 'body', 'Accessories' => 'accessories',
	);
	return isset( $map[ $category_name ] ) ? $map[ $category_name ] : 'skin';
}

/** Copy and lifestyle photos per family: noun, [image file, caption] pairs and benefit bullets. */
function skino_family_data( $family ) {
	$data = array(
		'skin'        => array(
			'noun'    => 'skincare',
			'images'  => array(
				array( 'cat_skincare.png', 'In your routine' ),
				array( 'brand_medicube.png', 'On the shelf' ),
				array( 'brand_cosrx.png', 'Morning light' ),
				array( 'brand_anua.png', 'Gift-ready' ),
			),
			'bullets' => array( 'Gentle formula, suitable for everyday use', 'Absorbs quickly with no sticky finish', 'Dermatologist tested and non-comedogenic' ),
		),
		'makeup'      => array(
			'noun'    => 'makeup',
			'images'  => array( array( 'cat_makeup.png', 'On the vanity' ) ),
			'bullets' => array( 'Rich, blendable colour with a comfortable finish', 'Long-wearing and lightweight on skin', 'Cruelty-free formula' ),
		),
		'hair'        => array(
			'noun'    => 'hair care',
			'images'  => array( array( 'cat_haircare.png', 'In your routine' ) ),
			'bullets' => array( 'Nourishes and smooths from root to tip', 'Rinses clean with no heavy residue', 'Suitable for everyday use' ),
		),
		'fragrance'   => array(
			'noun'    => 'fragrance',
			'images'  => array( array( 'cat_fragrance.png', 'The bottle' ) ),
			'bullets' => array( 'A refined scent that lasts through the day', 'Elegant bottle, gift-ready', 'Sealed and authentic' ),
		),
		'body'        => array(
			'noun'    => 'body care',
			'images'  => array( array( 'cat_bodycare.png', 'In your routine' ) ),
			'bullets' => array( 'Soft, hydrated skin that lasts all day', 'Fast absorbing and non-greasy', 'A light, pleasant scent' ),
		),
		'accessories' => array(
			'noun'    => 'accessory',
			'images'  => array( array( 'cat_accessories.png', 'Styled' ) ),
			'bullets' => array( 'Refined design that suits any outfit', 'Durable materials with a quality finish', 'Light, comfortable and easy to wear' ),
		),
	);
	return isset( $data[ $family ] ) ? $data[ $family ] : $data['skin'];
}

/**
 * Image URL for a product: its featured image, or the generated packshot for imported SKUs (SKINO-<id>).
 */
function skino_product_image_url( $product, $size = 'woocommerce_single' ) {
	$product = wc_get_product( $product );
	if ( ! $product ) {
		return skino_asset( 'img/cat_skincare.png' );
	}
	$image_id = $product->get_image_id();
	if ( $image_id ) {
		$src = wp_get_attachment_image_url( $image_id, $size );
		if ( $src ) {
			return $src;
		}
	}
	if ( preg_match( '/^SKINO-(\d+)$/', (string) $product->get_sku(), $m ) && file_exists( SKINO_DIR . '/assets/product-art/' . $m[1] . '.svg' ) ) {
		return skino_asset( 'product-art/' . $m[1] . '.svg' );
	}
	return wc_placeholder_img_src();
}

/** Returns array( rating, review count ): real WooCommerce reviews win over the imported figures. */
function skino_product_rating( $product ) {
	if ( $product->get_review_count() > 0 ) {
		return array( (float) $product->get_average_rating(), (int) $product->get_review_count() );
	}
	$rating = (float) $product->get_meta( '_skino_rating' );
	return array( $rating ? $rating : 5.0, (int) $product->get_meta( '_skino_review_count' ) );
}

function skino_discount_percent( $product ) {
	$regular = (float) $product->get_regular_price();
	$price   = (float) $product->get_price();
	return ( $regular > 0 && $price < $regular ) ? (int) round( ( 1 - $price / $regular ) * 100 ) : 0;
}

function skino_stars( $value, $class = 'w-3 h-3' ) {
	for ( $i = 1; $i <= 5; $i++ ) {
		$on = $i <= floor( $value );
		skino_icon( 'Star', $class . ' ' . ( $on ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200' ), $on ? 'currentColor' : 'none' );
	}
}

/** Render a product card (shared by archives, sale, wishlist, search). */
function skino_product_card( $product ) {
	$product = wc_get_product( $product );
	if ( $product ) {
		get_template_part( 'template-parts/product-card', null, array( 'product' => $product ) );
	}
}

/** Wishlist heart button (the list is kept in the visitor's browser, like the React app). */
function skino_wishlist_button( $product_id, $class = '' ) {
	printf(
		'<button type="button" data-wishlist-id="%1$d" aria-pressed="false" aria-label="%2$s" class="wishlist-btn %3$s">%4$s</button>',
		(int) $product_id,
		esc_attr__( 'Toggle wishlist', 'skino' ),
		esc_attr( $class ),
		skino_icon( 'Heart', 'w-4 h-4', 'none', false ) // phpcs:ignore WordPress.Security.EscapeOutput
	);
}

/** Social profile links shown in the header and footer. */
function skino_social_url( $name ) {
	$urls = array(
		'facebook'  => 'https://www.facebook.com/avishakh.chakrabortty',
		'instagram' => 'https://www.instagram.com/avishakh._.chakrabortty/',
		'twitter'   => 'https://x.com/AvishakhC',
	);
	return isset( $urls[ $name ] ) ? $urls[ $name ] : '#';
}

/** Label for the account link: 'Login / Signup' for visitors, 'My Account' once logged in. */
function skino_account_label( $short = false ) {
	if ( is_user_logged_in() ) {
		return $short ? __( 'Account', 'skino' ) : __( 'My Account', 'skino' );
	}
	return $short ? __( 'Login', 'skino' ) : __( 'Login/Signup', 'skino' );
}

function skino_social_icon( $name, $size = 16 ) {
	$icons = array(
		'facebook'  => '<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
		'instagram' => '<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
		'twitter'   => '<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
	);
	return isset( $icons[ $name ] ) ? sprintf( $icons[ $name ], $size ) : '';
}

/** Store contact details (editable in Customizer > Skino contact details). */
function skino_contact( $key ) {
	$defaults = array(
		'phone'   => '+8801722210508',
		'email'   => 'avishakh88@gmail.com',
		'address' => 'Navana Tower, Gulshan 1, Dhaka, Bangladesh',
		'brand'   => 'BeautyShop BD',
	);
	return get_theme_mod( 'skino_' . $key, isset( $defaults[ $key ] ) ? $defaults[ $key ] : '' );
}

add_action( 'customize_register', function ( $wp_customize ) {
	$wp_customize->add_section( 'skino_contact', array( 'title' => __( 'Skino contact details', 'skino' ), 'priority' => 30 ) );
	$fields = array( 'phone' => 'Phone', 'email' => 'Email', 'address' => 'Address', 'brand' => 'Store name' );
	foreach ( $fields as $key => $label ) {
		$wp_customize->add_setting( 'skino_' . $key, array( 'default' => skino_contact( $key ), 'sanitize_callback' => 'sanitize_text_field' ) );
		$wp_customize->add_control( 'skino_' . $key, array( 'label' => $label, 'section' => 'skino_contact', 'type' => 'text' ) );
	}
} );

/** Stable demo photo per family ('skin', 'makeup', ...) and seed — same hash as src/data/demoImages.js. */
function skino_demo_image( $family, $seed = 0 ) {
	static $cache = array();
	if ( ! isset( $cache[ $family ] ) ) {
		$files = glob( SKINO_DIR . '/assets/img/demo/' . $family . '_*.jpg' );
		if ( ! $files ) {
			$files = glob( SKINO_DIR . '/assets/img/demo/skin_*.jpg' );
		}
		sort( $files );
		$cache[ $family ] = array_map( 'basename', $files );
	}
	$list = $cache[ $family ];
	if ( ! $list ) {
		return skino_asset( 'img/cat_skincare.png' );
	}
	$h = 7;
	foreach ( str_split( (string) $seed ) as $ch ) {
		$h = ( $h * 31 + ord( $ch ) ) & 0xFFFFFFFF;
	}
	return skino_asset( 'img/demo/' . $list[ $h % count( $list ) ] );
}
