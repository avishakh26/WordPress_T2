<?php
/**
 * Login / sign-up: one card, two tabs (only one form is visible at a time).
 * Overrides woocommerce/myaccount/form-login.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// Reopen on the Sign up tab after a failed registration, or when linked with #register.
// phpcs:ignore WordPress.Security.NonceVerification
$start_on_register = 'yes' === get_option( 'woocommerce_enable_myaccount_registration' ) && ( isset( $_POST['register'] ) );
$can_register      = 'yes' === get_option( 'woocommerce_enable_myaccount_registration' );

do_action( 'woocommerce_before_customer_login_form' );
?>
<div class="skino-auth" data-auth data-start="<?php echo $start_on_register ? 'register' : 'login'; ?>">
	<div class="skino-auth-head">
		<h2 data-auth-title><?php esc_html_e( 'Welcome back', 'skino' ); ?></h2>
		<p data-auth-sub><?php esc_html_e( 'Log in to see your orders, addresses and wishlist.', 'skino' ); ?></p>
	</div>

	<?php if ( $can_register ) : ?>
		<div class="skino-auth-tabs" role="tablist">
			<button type="button" role="tab" data-auth-tab="login" aria-selected="true"><?php esc_html_e( 'Login', 'skino' ); ?></button>
			<button type="button" role="tab" data-auth-tab="register" aria-selected="false"><?php esc_html_e( 'Sign up', 'skino' ); ?></button>
		</div>
	<?php endif; ?>

	<!-- Login -->
	<form class="woocommerce-form woocommerce-form-login login skino-auth-panel" data-auth-panel="login" method="post" novalidate>
		<?php do_action( 'woocommerce_login_form_start' ); ?>
		<p class="woocommerce-form-row form-row">
			<label for="username"><?php esc_html_e( 'Username or email address', 'woocommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span></label>
			<input type="text" class="woocommerce-Input input-text" name="username" id="username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) && is_string( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification ?>" required>
		</p>
		<p class="woocommerce-form-row form-row">
			<label for="password"><?php esc_html_e( 'Password', 'woocommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span></label>
			<input class="woocommerce-Input input-text" type="password" name="password" id="password" autocomplete="current-password" required>
		</p>
		<?php do_action( 'woocommerce_login_form' ); ?>
		<div class="skino-auth-row">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox woocommerce-form-login__rememberme">
				<input class="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever"> <span><?php esc_html_e( 'Remember me', 'woocommerce' ); ?></span>
			</label>
			<a class="skino-auth-link" href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Lost your password?', 'woocommerce' ); ?></a>
		</div>
		<?php wp_nonce_field( 'woocommerce-login', 'woocommerce-login-nonce' ); ?>
		<button type="submit" class="woocommerce-button button woocommerce-form-login__submit" name="login" value="<?php esc_attr_e( 'Log in', 'woocommerce' ); ?>"><?php esc_html_e( 'Log in', 'woocommerce' ); ?></button>
		<?php do_action( 'woocommerce_login_form_end' ); ?>
		<?php if ( $can_register ) : ?>
			<p class="skino-auth-switch"><?php esc_html_e( 'New here?', 'skino' ); ?> <button type="button" data-auth-tab="register"><?php esc_html_e( 'Create an account', 'skino' ); ?></button></p>
		<?php endif; ?>
	</form>

	<?php if ( $can_register ) : ?>
		<!-- Sign up -->
		<form method="post" class="woocommerce-form woocommerce-form-register register skino-auth-panel" data-auth-panel="register" hidden <?php do_action( 'woocommerce_register_form_tag' ); ?>>
			<?php do_action( 'woocommerce_register_form_start' ); ?>

			<?php if ( 'no' === get_option( 'woocommerce_registration_generate_username' ) ) : ?>
				<p class="woocommerce-form-row form-row">
					<label for="reg_username"><?php esc_html_e( 'Username', 'woocommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span></label>
					<input type="text" class="woocommerce-Input input-text" name="username" id="reg_username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification ?>" required>
				</p>
			<?php endif; ?>

			<p class="woocommerce-form-row form-row">
				<label for="reg_email"><?php esc_html_e( 'Email address', 'woocommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span></label>
				<input type="email" class="woocommerce-Input input-text" name="email" id="reg_email" autocomplete="email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification ?>" required>
			</p>

			<?php if ( 'no' === get_option( 'woocommerce_registration_generate_password' ) ) : ?>
				<p class="woocommerce-form-row form-row">
					<label for="reg_password"><?php esc_html_e( 'Password', 'woocommerce' ); ?>&nbsp;<span class="required" aria-hidden="true">*</span></label>
					<input type="password" class="woocommerce-Input input-text" name="password" id="reg_password" autocomplete="new-password" required>
				</p>
			<?php else : ?>
				<p><?php esc_html_e( 'A link to set a new password will be sent to your email address.', 'woocommerce' ); ?></p>
			<?php endif; ?>

			<?php do_action( 'woocommerce_register_form' ); ?>

			<?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>
			<button type="submit" class="woocommerce-Button woocommerce-button button woocommerce-form-register__submit" name="register" value="<?php esc_attr_e( 'Register', 'woocommerce' ); ?>"><?php esc_html_e( 'Create account', 'skino' ); ?></button>

			<?php do_action( 'woocommerce_register_form_end' ); ?>
			<p class="skino-auth-switch"><?php esc_html_e( 'Already have an account?', 'skino' ); ?> <button type="button" data-auth-tab="login"><?php esc_html_e( 'Log in', 'skino' ); ?></button></p>
		</form>
	<?php endif; ?>
</div>
<?php do_action( 'woocommerce_after_customer_login_form' ); ?>
