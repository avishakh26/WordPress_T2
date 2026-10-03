<?php
/**
 * Site footer, mobile bottom nav, floating cart button and the cart drawer.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$brand_name = skino_contact( 'brand' );
$wishlist   = get_page_by_path( 'wishlist' );
$account    = function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'myaccount' ) : wp_login_url();
$cats       = array( 'Makeup', 'Skin Care', 'Hair Care', 'Fragrance', 'Body Care' );
?>
</main>

<footer class="bg-secondary text-gray-300 pt-10 md:pt-16 pb-6 md:pb-8">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-8 mb-8 md:mb-12">
			<div class="col-span-2 lg:col-span-1">
				<h3 class="text-white text-xl font-montserrat font-bold mb-4 md:mb-6"><span class="text-primary">B</span>eautyShop</h3>
				<p class="mb-6 text-sm leading-relaxed"><?php echo esc_html( $brand_name ); ?> is your ultimate destination for authentic and branded cosmetics, skincare, and beauty products in Bangladesh. We bring you the best globally.</p>
				<div class="flex space-x-4">
					<?php foreach ( array( 'facebook', 'instagram', 'twitter' ) as $s ) : ?>
						<a href="<?php echo esc_url( skino_social_url( $s ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( 'twitter' === $s ? 'X (Twitter)' : ucfirst( $s ) ); ?>" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"><?php echo skino_social_icon( $s, 20 ); // phpcs:ignore ?></a>
					<?php endforeach; ?>
				</div>
			</div>

			<div>
				<h4 class="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6"><?php esc_html_e( 'Quick Links', 'skino' ); ?></h4>
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'menu_class' => 'space-y-3 text-sm', 'depth' => 1 ) );
				} else {
					$links = array(
						'About Us'           => '#',
						'Contact Us'         => '#',
						'Privacy Policy'     => get_privacy_policy_url() ? get_privacy_policy_url() : '#',
						'Terms & Conditions' => '#',
						'Return Policy'      => '#',
					);
					echo '<ul class="space-y-3 text-sm">';
					foreach ( $links as $label => $url ) {
						printf( '<li><a href="%s" class="hover:text-primary transition-colors">%s</a></li>', esc_url( $url ), esc_html( $label ) );
					}
					echo '</ul>';
				}
				?>
			</div>

			<div>
				<h4 class="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6"><?php esc_html_e( 'Top Categories', 'skino' ); ?></h4>
				<ul class="space-y-3 text-sm">
					<?php foreach ( $cats as $c ) : ?>
						<li><a href="<?php echo esc_url( skino_category_url( $c ) ); ?>" class="hover:text-primary transition-colors"><?php echo esc_html( $c ); ?></a></li>
					<?php endforeach; ?>
				</ul>
			</div>

			<div class="col-span-2 lg:col-span-1">
				<h4 class="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6"><?php esc_html_e( 'Contact Us', 'skino' ); ?></h4>
				<ul class="space-y-4 text-sm">
					<li class="flex items-start gap-3"><?php skino_icon( 'MapPin', 'w-5 h-5 text-primary shrink-0 mt-0.5' ); ?><span><?php echo esc_html( skino_contact( 'address' ) ); ?></span></li>
					<li class="flex items-center gap-3"><?php skino_icon( 'Phone', 'w-5 h-5 text-primary shrink-0' ); ?><span><?php echo esc_html( skino_contact( 'phone' ) ); ?></span></li>
					<li class="flex items-center gap-3"><?php skino_icon( 'Mail', 'w-5 h-5 text-primary shrink-0' ); ?><span><?php echo esc_html( skino_contact( 'email' ) ); ?></span></li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-800 pt-8 lg:pr-20 flex flex-col md:flex-row justify-between items-center text-xs">
			<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( $brand_name ); ?>. <?php esc_html_e( 'All Rights Reserved.', 'skino' ); ?></p>
			<ul class="mt-4 md:mt-0 flex items-center gap-2.5" aria-label="<?php esc_attr_e( 'Payment methods', 'skino' ); ?>">
				<li class="skino-pay" title="Visa" role="img" aria-label="Visa">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 24 14" width="40" height="23" fill="#1A1F71" aria-hidden="true"><path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
				</li>
				<li class="skino-pay" title="Mastercard" role="img" aria-label="Mastercard">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="36" height="23" aria-hidden="true"><circle cx="13" cy="12" r="11" fill="#EB001B"/><circle cx="25" cy="12" r="11" fill="#F79E1B"/><path d="M19 2.78A11 11 0 0 1 19 21.22A11 11 0 0 1 19 2.78Z" fill="#FF5F00"/></svg>
				</li>
				<li class="skino-pay skino-pay-bkash" title="bKash" role="img" aria-label="bKash">
					<img src="<?php echo esc_url( skino_asset( 'img/bkash_logo_custom.png' ) ); ?>" alt="" width="22" height="22" loading="lazy">
					<span>bKash</span>
				</li>
			</ul>
		</div>
	</div>
</footer>

<!-- Mobile bottom nav -->
<nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 flex justify-around items-center py-3" aria-label="<?php esc_attr_e( 'Quick navigation', 'skino' ); ?>">
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex flex-col items-center text-primary"><?php skino_icon( 'Home', 'w-6 h-6' ); ?><span class="text-[10px] font-medium mt-1"><?php esc_html_e( 'Home', 'skino' ); ?></span></a>
	<button type="button" data-mobile-menu-toggle class="flex flex-col items-center text-textMuted hover:text-primary"><?php skino_icon( 'Grid', 'w-6 h-6' ); ?><span class="text-[10px] font-medium mt-1"><?php esc_html_e( 'Categories', 'skino' ); ?></span></button>
	<button type="button" data-cart-open class="flex flex-col items-center text-textMuted hover:text-primary relative">
		<?php skino_icon( 'ShoppingCart', 'w-6 h-6' ); ?>
		<span data-cart-count class="absolute -top-1 right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"><?php echo (int) skino_cart_count(); ?></span>
		<span class="text-[10px] font-medium mt-1"><?php esc_html_e( 'Cart', 'skino' ); ?></span>
	</button>
	<a href="<?php echo esc_url( $account ); ?>" class="flex flex-col items-center text-textMuted hover:text-primary"><?php skino_icon( 'User', 'w-6 h-6' ); ?><span class="text-[10px] font-medium mt-1"><?php echo esc_html( skino_account_label( true ) ); ?></span></a>
</nav>

<!-- Floating cart button (desktop) -->
<button type="button" data-cart-open class="hidden lg:flex fixed bottom-10 right-6 bg-white p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-110 z-[100] items-center justify-center cursor-pointer group" title="<?php esc_attr_e( 'Open Cart', 'skino' ); ?>" aria-label="<?php esc_attr_e( 'Open cart', 'skino' ); ?>">
	<?php skino_icon( 'ShoppingCart', 'w-8 h-8 text-primary group-hover:text-primaryDark transition-colors' ); ?>
	<span data-cart-count class="absolute -top-1 -right-1 bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white"><?php echo (int) skino_cart_count(); ?></span>
</button>

<!-- Cart drawer -->
<div data-cart-overlay class="hidden fixed inset-0 bg-black/50 z-[200]"></div>
<aside id="cart-drawer" data-cart-drawer role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Your cart', 'skino' ); ?>" class="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[210] shadow-2xl transform translate-x-full transition-transform duration-300">
	<div id="cart-drawer-inner" class="flex flex-col h-full"><?php echo function_exists( 'WC' ) && WC()->cart ? skino_cart_drawer_inner() : ''; // phpcs:ignore ?></div>
</aside>

<?php wp_footer(); ?>
</div>
</body>
</html>
