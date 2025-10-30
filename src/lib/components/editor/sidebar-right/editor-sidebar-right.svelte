<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
	import PageStructureTree from "./page-structure-tree.svelte";
	import { Layers } from "@lucide/svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const page = $derived(editorManager.page);
</script>

<Sidebar.Root
	bind:ref
	collapsible="none"
	class="hidden h-full border-l lg:flex shrink-0 overflow-hidden"
	{...restProps}
>
	<Sidebar.Header class="border-sidebar-border px-4 py-3">
		<div class="flex items-center gap-2">
			<Layers class="size-4" />
			<span class="font-semibold">Page Structure</span>
		</div>
	</Sidebar.Header>
	<Sidebar.Content class="overflow-y-auto">
		<Sidebar.Group>
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
			{page.elements.length} {page.elements.length === 1 ? 'element' : 'elements'}
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
