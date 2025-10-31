<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import PageStructureTree from './page-structure-tree.svelte';
	import { Layers } from '@lucide/svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const page = $derived(editorManager.page);
</script>

<Sidebar.Root
	bind:ref
	collapsible="none"
	class="hidden h-full shrink-0 overflow-hidden border-l lg:flex"
	{...restProps}
>
	<Sidebar.Content class="overflow-y-auto">
		<Sidebar.Group>
			<Sidebar.GroupLabel>Page Structure</Sidebar.GroupLabel>

			<Sidebar.Menu>
				{#if page.elements.length > 0}
					{#each page.elements as element (element.id)}
						<PageStructureTree {element} />
					{/each}
				{:else}
					<div class="px-4 py-8 text-center text-sm text-muted-foreground">
						No elements yet. Start by adding blocks to your page.
					</div>
				{/if}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<div class="px-4 py-2 text-xs text-muted-foreground">
			{page.elements.length}
			{page.elements.length === 1 ? 'element' : 'elements'}
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
