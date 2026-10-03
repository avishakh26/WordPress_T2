<?php
/**
 * Catalogue filter: Category + Brand sections. Sidebar on desktop, slide-in drawer on phones.
 *
 * @var array $args { sections: array{key,title,items[],has_active}[], active_label: string, clear_url: string|null }
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$sections  = $args['sections'];
$clear_url = isset( $args['clear_url'] ) ? $args['clear_url'] : '';

ob_start();
?>
<?php if ( $clear_url ) : ?>
	<a href="<?php echo esc_url( $clear_url ); ?>" class="skino-filter-clear"><?php skino_icon( 'X', 'w-3.5 h-3.5' ); ?> <?php esc_html_e( 'Clear all filters', 'skino' ); ?></a>
<?php endif; ?>
<?php foreach ( $sections as $i => $section ) : ?>
	<details class="skino-filter-group" open>
		<summary>
			<span><?php echo esc_html( $section['title'] ); ?></span>
			<?php skino_icon( 'ChevronDown', 'w-4 h-4 skino-filter-chevron' ); ?>
		</summary>
		<ul class="skino-filter-list">
			<?php foreach ( $section['items'] as $item ) : ?>
				<li>
					<a href="<?php echo esc_url( $item['url'] ); ?>" <?php echo $item['active'] ? 'aria-current="true"' : ''; ?> class="skino-filter-item<?php echo $item['active'] ? ' is-active' : ''; ?>">
						<span class="skino-filter-box" aria-hidden="true"><?php skino_icon( 'Check', 'w-3 h-3' ); ?></span>
						<span class="skino-filter-label"><?php echo esc_html( $item['label'] ); ?></span>
						<span class="skino-filter-count"><?php echo (int) $item['count']; ?></span>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	</details>
<?php endforeach; ?>
<?php
$body = ob_get_clean();
?>
<aside class="hidden lg:block w-72 xl:w-80 shrink-0 self-start">
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
		<div class="bg-primary text-white px-4 py-3 font-bold font-montserrat uppercase text-sm tracking-wider"><?php esc_html_e( 'Filters', 'skino' ); ?></div>
		<div><?php echo $body; // phpcs:ignore ?></div>
	</div>
</aside>

<div class="lg:hidden flex items-center justify-between gap-3">
	<button type="button" data-filter-open aria-haspopup="dialog" class="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-secondary active:bg-gray-50">
		<?php skino_icon( 'SlidersHorizontal', 'w-4 h-4 text-primary' ); ?> <?php esc_html_e( 'Filter', 'skino' ); ?>
	</button>
	<span class="text-sm text-gray-500 truncate"><?php echo esc_html( $args['active_label'] ); ?></span>
</div>

<div data-filter-drawer class="hidden lg:hidden fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Filters', 'skino' ); ?>">
	<div data-filter-close class="absolute inset-0 bg-black/50"></div>
	<div class="absolute left-0 top-0 h-full w-[85%] max-w-xs bg-white shadow-2xl flex flex-col" style="animation: slideInLeft .25s ease-out">
		<div class="bg-primary text-white px-4 py-3.5 flex items-center justify-between">
			<span class="font-bold font-montserrat uppercase text-sm tracking-wider"><?php esc_html_e( 'Filters', 'skino' ); ?></span>
			<button type="button" data-filter-close aria-label="<?php esc_attr_e( 'Close filter', 'skino' ); ?>" class="p-1.5 -mr-1.5 rounded-full hover:bg-white/20"><?php skino_icon( 'X', 'w-5 h-5' ); ?></button>
		</div>
		<div class="flex-1 overflow-y-auto"><?php echo $body; // phpcs:ignore ?></div>
	</div>
</div>
