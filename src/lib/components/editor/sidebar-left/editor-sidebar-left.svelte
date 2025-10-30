<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import AddBlock from '$lib/components/editor/sidebar-left/add-block.svelte';
	import EditBlock from '$lib/components/editor/sidebar-left/edit-block.svelte';
</script>

<Sidebar.Root class="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...restProps}>
	<Sidebar.Content>
		{#if editorManager.leftSidebarMode === 'add'}
			<AddBlock />
		{:else if editorManager.leftSidebarMode === 'edit'}
			<EditBlock />
		{/if}
	</Sidebar.Content>
	<Sidebar.Footer></Sidebar.Footer>
</Sidebar.Root>
