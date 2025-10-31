<script lang="ts">
	import type { BuilderElement } from '$lib/types/editor';
	import { getBlockComponent } from './block-registry';

	let { element }: { element: BuilderElement } = $props();

	const Component = $derived(getBlockComponent(element.type));
</script>

{#if Component}
	<Component {element} />
{:else}
	<div class="border border-red-400 bg-red-100 p-4 text-red-700">
		Unknown block type: {element.type}
	</div>
{/if}
