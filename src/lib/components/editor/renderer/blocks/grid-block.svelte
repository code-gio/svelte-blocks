<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import BlockRenderer from '../block-renderer.svelte';
	import DropZone from '../drop-zone.svelte';
	import {
		createClickHandler,
		createKeyDownHandler,
		isElementSelected,
		extractGridStyles,
		extractSpacingStyles,
		extractBackgroundStyles,
		extractBorderStyles,
		extractPositionStyles,
		extractEffectsStyles,
		combineStyles,
		getContainerBlockClasses,
		getItemsPerRow
	} from './block-utils';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = createClickHandler(element.id);
	const handleKeyDown = createKeyDownHandler(element.id);
	const isSelected = $derived(isElementSelected(element.id));
	const itemsPerRow = $derived(getItemsPerRow(element, 4));

	// Combine grid-specific styles with other design properties
	const styles = $derived(
		combineStyles(
			extractGridStyles(element.properties.design, itemsPerRow),
			extractSpacingStyles(element.properties.design, 'padding'),
			extractSpacingStyles(element.properties.design, 'margin'),
			extractBackgroundStyles(element.properties.design),
			extractBorderStyles(element.properties.design),
			extractPositionStyles(element.properties.design),
			extractEffectsStyles(element.properties.design)
		)
	);
</script>

<div
	data-element-id={element.id}
	data-element-type={element.type}
	class={getContainerBlockClasses(isSelected)}
	style={styles}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	{#if element.children.length > 0}
		<DropZone parentId={element.id} index={0} />
		{#each element.children as child, i (child.id)}
			<BlockRenderer element={child} />
			<DropZone parentId={element.id} index={i + 1} />
		{/each}
	{:else}
		<DropZone parentId={element.id} index={0} />
		<div class="pointer-events-none py-8 text-center text-gray-400">Drop blocks here</div>
	{/if}
</div>

