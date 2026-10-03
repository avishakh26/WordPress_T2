<?php
/**
 * Site header: top bar, logo + search + icons, category nav, mobile menu.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$brands_popular = array( 'Anua', 'Sheglam', 'Centella', 'Cosrx', 'Everly', 'Lily', 'Medicube', 'Nior', 'Swiss Beauty', 'Mars' );
$demo_imgs      = glob( SKINO_DIR . '/assets/img/demo/skin_*.jpg' );
sort( $demo_imgs );
$wishlist_url = ( $p = get_page_by_path( 'wishlist' ) ) ? get_permalink( $p ) : home_url( '/wishlist/' );
$account_url  = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-gray-50 text-textMain font-sans antialiased' ); ?>>
<?php wp_body_open(); ?>
<div class="min-h-screen flex flex-col pb-16 lg:pb-0 overflow-x-hidden w-full max-w-[100vw]">

<header class="w-full relative z-[150] bg-white">
	<!-- Top bar -->
	<div class="bg-[#f5f5f5] text-textMuted text-xs py-2 border-b border-gray-200 hidden lg:block">
		<div class="container mx-auto px-4 flex justify-between items-center">
			<div class="flex items-center space-x-4">
				<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', skino_contact( 'phone' ) ) ); ?>" class="flex items-center gap-1 hover:text-primary transition"><?php skino_icon( 'Phone', 'w-3 h-3' ); ?> <?php echo esc_html( skino_contact( 'phone' ) ); ?></a>
				<a href="mailto:<?php echo esc_attr( skino_contact( 'email' ) ); ?>" class="flex items-center gap-1 hover:text-primary transition"><?php skino_icon( 'Mail', 'w-3 h-3' ); ?> <?php echo esc_html( skino_contact( 'email' ) ); ?></a>
			</div>
			<div class="flex items-center space-x-4">
				<div class="flex items-center space-x-3">
					<a href="<?php echo esc_url( skino_social_url( 'facebook' ) ); ?>" target="_blank" rel="noopener noreferrer" class="hover:text-primary" aria-label="Facebook"><?php echo skino_social_icon( 'facebook' ); // phpcs:ignore ?></a>
					<a href="<?php echo esc_url( skino_social_url( 'instagram' ) ); ?>" target="_blank" rel="noopener noreferrer" class="hover:text-primary" aria-label="Instagram"><?php echo skino_social_icon( 'instagram' ); // phpcs:ignore ?></a>
					<a href="<?php echo esc_url( skino_social_url( 'twitter' ) ); ?>" target="_blank" rel="noopener noreferrer" class="hover:text-primary" aria-label="X (Twitter)"><?php echo skino_social_icon( 'twitter' ); // phpcs:ignore ?></a>
				</div>
				<div class="border-l border-gray-300 pl-4 space-x-3">
					<a href="<?php echo esc_url( $account_url ); ?>" class="hover:text-primary"><?php esc_html_e( 'Order Tracking', 'skino' ); ?></a>
					<a href="#" class="hover:text-primary"><?php esc_html_e( 'FAQs', 'skino' ); ?></a>
				</div>
			</div>
		</div>
	</div>

	<!-- Main header -->
	<div class="bg-white py-3 lg:py-5 shadow-sm">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between mb-3 lg:mb-0">
				<div class="flex items-center gap-2 lg:gap-0">
					<button type="button" data-mobile-menu-toggle class="lg:hidden text-red-500 mr-2 p-1" aria-label="<?php esc_attr_e( 'Menu', 'skino' ); ?>" aria-expanded="false"><?php skino_icon( 'Menu', 'w-6 h-6' ); ?></button>

					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-2xl lg:text-3xl font-montserrat font-bold text-secondary flex items-center gap-1 lg:gap-2">
						<?php if ( has_custom_logo() ) : ?>
							<?php the_custom_logo(); ?>
						<?php else : ?>
							<span class="text-[#d4af37] font-light hidden lg:inline">BEAUTY</span>
							<div class="lg:hidden flex flex-col items-center">
								<span class="text-[#d4af37] text-xl sm:text-2xl font-light tracking-wider">BEAUTY</span>
								<span class="text-[8px] text-gray-500 uppercase tracking-widest leading-none">Shop BD</span>
							</div>
							<div class="hidden lg:flex flex-col text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-1"><span>Shop BD</span></div>
						<?php endif; ?>
					</a>
				</div>

				<!-- Desktop brand mega menu + search -->
				<div class="hidden lg:flex flex-1 max-w-3xl mx-6 items-center gap-6">
					<div class="relative group flex items-center h-full">
						<div class="flex items-center text-sm font-semibold text-gray-800 cursor-pointer py-4">
							<?php esc_html_e( 'Brand', 'skino' ); ?> <?php skino_icon( 'ChevronDown', 'w-4 h-4 ml-1 group-hover:rotate-180 transition-transform' ); ?>
						</div>
						<div class="absolute top-full -left-10 w-[700px] lg:w-[800px] bg-[#f8f9fa] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] flex text-left">
							<div class="w-1/3 bg-white border-r border-gray-200 py-4 px-6 flex flex-col max-h-[450px] overflow-y-auto">
								<h3 class="text-[#0a4275] font-bold text-base mb-4"><?php esc_html_e( 'Top Brand', 'skino' ); ?></h3>
								<ul class="flex flex-col gap-3">
									<?php foreach ( skino_top_brands() as $brand ) : ?>
										<li><a href="<?php echo esc_url( skino_brand_url( $brand ) ); ?>" class="text-gray-700 text-[13px] hover:text-primary transition-colors"><?php echo esc_html( $brand ); ?></a></li>
									<?php endforeach; ?>
								</ul>
							</div>
							<div class="w-2/3 py-4 px-6 bg-[#f8f9fa]">
								<div class="border-b border-[#0a4275] mb-4 relative flex justify-center">
									<h3 class="text-[#0a4275] font-bold text-base bg-[#f8f9fa] px-4 relative top-2.5"><?php esc_html_e( 'Popular Brand', 'skino' ); ?></h3>
								</div>
								<div class="grid grid-cols-4 gap-4 mt-8">
									<?php foreach ( $brands_popular as $i => $brand ) : $img = $demo_imgs ? basename( $demo_imgs[ $i % count( $demo_imgs ) ] ) : ''; ?>
										<a href="<?php echo esc_url( skino_brand_url( $brand ) ); ?>" class="relative bg-white border border-gray-100 overflow-hidden flex items-end justify-center hover:shadow-md transition-shadow aspect-[3/2]">
											<?php if ( $img ) : ?><img src="<?php echo esc_url( skino_asset( 'img/demo/' . $img ) ); ?>" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover"><?php endif; ?>
											<span class="relative w-full bg-white/90 text-center text-[11px] font-semibold text-secondary py-1"><?php echo esc_html( $brand ); ?></span>
										</a>
									<?php endforeach; ?>
								</div>
							</div>
						</div>
					</div>

					<!-- Search -->
					<div class="relative flex flex-1" data-search>
						<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex w-full border border-purple-400 rounded-full overflow-hidden h-10 bg-white">
							<input type="hidden" name="post_type" value="product">
							<input type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Search...', 'skino' ); ?>" autocomplete="off" data-search-input class="flex-1 px-5 focus:outline-none text-sm">
							<button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-6 transition-colors flex items-center justify-center" aria-label="<?php esc_attr_e( 'Search', 'skino' ); ?>"><?php skino_icon( 'Search', 'w-5 h-5' ); ?></button>
						</form>
						<div data-search-results class="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-[100] overflow-hidden"></div>
					</div>
				</div>

				<!-- Icons -->
				<div class="flex items-center gap-2 sm:gap-4 lg:gap-6">
					<a href="<?php echo esc_url( $account_url ); ?>" class="flex flex-col items-center text-secondary hover:text-primary transition group">
						<?php skino_icon( 'User', 'w-5 h-5 lg:w-6 lg:h-6 mb-1 lg:group-hover:-translate-y-1 transition-transform' ); ?>
						<span class="hidden lg:inline text-[10px] font-medium uppercase tracking-wider"><?php echo esc_html( skino_account_label() ); ?></span>
					</a>
					<a href="<?php echo esc_url( $wishlist_url ); ?>" class="hidden lg:flex flex-col items-center text-secondary hover:text-primary transition relative group">
						<?php skino_icon( 'Heart', 'w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform' ); ?>
						<span data-wishlist-count class="hidden absolute -top-1 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full items-center justify-center">0</span>
						<span class="text-[10px] font-medium uppercase tracking-wider"><?php esc_html_e( 'Wishlist', 'skino' ); ?></span>
					</a>
					<button type="button" data-cart-open class="flex flex-col items-center text-secondary hover:text-primary transition relative group" aria-label="<?php esc_attr_e( 'Open cart', 'skino' ); ?>">
						<?php skino_icon( 'ShoppingBag', 'w-5 h-5 lg:w-6 lg:h-6 mb-1 lg:group-hover:-translate-y-1 transition-transform' ); ?>
						<span data-cart-count class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"><?php echo (int) skino_cart_count(); ?></span>
						<span class="hidden lg:inline text-[10px] font-medium uppercase tracking-wider"><?php esc_html_e( 'Cart', 'skino' ); ?></span>
					</button>
				</div>
			</div>

			<!-- Mobile search -->
			<div class="relative lg:hidden w-full" data-search>
				<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex w-full border border-purple-400 rounded-full overflow-hidden h-10 shadow-sm bg-white">
					<input type="hidden" name="post_type" value="product">
					<input type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Search...', 'skino' ); ?>" autocomplete="off" data-search-input class="flex-1 px-4 focus:outline-none text-sm">
					<button type="submit" class="bg-purple-600 text-white px-5 flex items-center justify-center" aria-label="<?php esc_attr_e( 'Search', 'skino' ); ?>"><?php skino_icon( 'Search', 'w-4 h-4' ); ?></button>
				</form>
				<div data-search-results class="hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-[100] overflow-hidden"></div>
			</div>
		</div>
	</div>

	<!-- Category navigation -->
	<div class="bg-white text-secondary border-t border-b border-gray-100 hidden lg:block">
		<div class="container mx-auto px-4 flex items-center h-12">
			<nav class="flex-1 flex items-center justify-between px-0 xl:px-6 text-[10px] lg:text-[13px] xl:text-sm font-medium uppercase tracking-wider" aria-label="<?php esc_attr_e( 'Shop categories', 'skino' ); ?>">
				<div class="flex items-center gap-3 lg:gap-4 xl:gap-6">
					<?php foreach ( skino_nav_categories() as $label => $name ) : $url = skino_category_url( $name ); ?>
						<div class="relative group py-3 cursor-pointer text-gray-800">
							<a href="<?php echo esc_url( $url ); ?>" class="hover:text-primary transition flex items-center gap-1 whitespace-nowrap"><?php echo esc_html( $label ); ?> <?php skino_icon( 'ChevronDown', 'w-4 h-4' ); ?></a>
							<div class="absolute top-full left-0 w-48 bg-white border border-gray-200 text-secondary shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-lg">
								<ul class="py-2">
									<li><a href="<?php echo esc_url( $url ); ?>" class="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal"><?php printf( esc_html__( 'Shop All %s', 'skino' ), esc_html( $name ) ); ?></a></li>
									<li><a href="<?php echo esc_url( add_query_arg( 'orderby', 'date', $url ) ); ?>" class="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal"><?php esc_html_e( 'New Arrivals', 'skino' ); ?></a></li>
									<li><a href="<?php echo esc_url( add_query_arg( 'orderby', 'rating', $url ) ); ?>" class="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal"><?php esc_html_e( 'Top Rated', 'skino' ); ?></a></li>
								</ul>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
				<div class="flex items-center gap-1.5 lg:gap-3 ml-3">
					<a href="<?php echo esc_url( skino_sale_url( 'k-beauty' ) ); ?>" class="bg-[#FF007F] hover:bg-[#D9006C] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">K-Beauty Sale</a>
					<a href="<?php echo esc_url( skino_sale_url( 'clearance' ) ); ?>" class="bg-[#D30000] hover:bg-[#A60000] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">Clearance Sale</a>
					<a href="<?php echo esc_url( skino_sale_url( 'j-beauty' ) ); ?>" class="bg-[#7800D7] hover:bg-[#5E00B3] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">J-Beauty Sale</a>
				</div>
			</nav>
		</div>
	</div>

	<!-- Mobile menu -->
	<div data-mobile-menu class="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 lg:hidden overflow-hidden transition-all duration-300 ease-in-out z-50 max-h-0 opacity-0">
		<div class="flex flex-col overflow-y-auto max-h-[80vh]">
			<div class="py-2">
				<?php foreach ( skino_nav_categories() as $label => $name ) : $url = skino_category_url( $name ); ?>
					<div class="border-b border-gray-50" data-accordion>
						<button type="button" data-accordion-toggle class="w-full flex items-center justify-between p-4 text-[13px] font-semibold text-gray-800 hover:bg-gray-50">
							<?php echo esc_html( $label ); ?>
							<?php skino_icon( 'ChevronDown', 'w-4 h-4 text-gray-400 transition-transform duration-300' ); ?>
						</button>
						<div data-accordion-panel class="overflow-hidden transition-all duration-300 bg-gray-50 max-h-0 opacity-0">
							<ul class="py-2 px-6">
								<li><a href="<?php echo esc_url( $url ); ?>" class="block py-2 text-[13px] text-gray-600"><?php printf( esc_html__( 'Shop All %s', 'skino' ), esc_html( $name ) ); ?></a></li>
								<li><a href="<?php echo esc_url( add_query_arg( 'orderby', 'date', $url ) ); ?>" class="block py-2 text-[13px] text-gray-600"><?php esc_html_e( 'New Arrivals', 'skino' ); ?></a></li>
								<li><a href="<?php echo esc_url( add_query_arg( 'orderby', 'rating', $url ) ); ?>" class="block py-2 text-[13px] text-gray-600"><?php esc_html_e( 'Top Rated', 'skino' ); ?></a></li>
							</ul>
						</div>
					</div>
				<?php endforeach; ?>
				<div class="p-4 grid grid-cols-1 gap-2">
					<a href="<?php echo esc_url( skino_sale_url( 'k-beauty' ) ); ?>" class="bg-[#FF007F] text-white text-center text-sm font-bold py-2.5 rounded">K-Beauty Sale</a>
					<a href="<?php echo esc_url( skino_sale_url( 'clearance' ) ); ?>" class="bg-[#D30000] text-white text-center text-sm font-bold py-2.5 rounded">Clearance Sale</a>
					<a href="<?php echo esc_url( skino_sale_url( 'j-beauty' ) ); ?>" class="bg-[#7800D7] text-white text-center text-sm font-bold py-2.5 rounded">J-Beauty Sale</a>
				</div>
			</div>
		</div>
	</div>
</header>

<main class="flex-1">
