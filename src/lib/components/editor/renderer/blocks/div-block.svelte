<script lang="ts">
	import type { BuilderElement } from '$lib/types/block';
	import BlockRenderer from '../block-renderer.svelte';
	import DropZone from '../drop-zone.svelte';
	import {
		createClickHandler,
		createKeyDownHandler,
		isElementSelected,
		extractAllStyles,
		getContainerBlockClasses
	} from './block-utils';

	let { element }: { element: BuilderElement } = $props();

	const handleClick = createClickHandler(element.id);
	const handleKeyDown = createKeyDownHandler(element.id);
	const isSelected = $derived(isElementSelected(element.id));
	const styles = $derived(extractAllStyles(element.properties.design));
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

