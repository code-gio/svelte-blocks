<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import { getBlockById } from '$lib/components/editor/renderer/block-registry.js';
	import EditBlockTabs from './edit-block-tabs.svelte';

	const selectedElement = $derived(
		editorManager.selectedElementId
			? editorManager.findElementById(editorManager.selectedElementId)
			: null
	);

	const blockInfo = $derived(selectedElement ? getBlockById(selectedElement.type) : null);

	const elementLabel = $derived(blockInfo?.name || selectedElement?.type || 'Block');
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>
		{#if selectedElement}
			Edit {elementLabel}
		{:else}
			Edit Block
		{/if}
	</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		{#if selectedElement}
			<Tabs.Root value="content" class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="content">Content</Tabs.Trigger>
					<Tabs.Trigger value="design">Design</Tabs.Trigger>
					<Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="content">
					<EditBlockTabs element={selectedElement} tab="content" />
				</Tabs.Content>
				<Tabs.Content value="design">
					<EditBlockTabs element={selectedElement} tab="design" />
				</Tabs.Content>
				<Tabs.Content value="advanced">
					<EditBlockTabs element={selectedElement} tab="advanced" />
				</Tabs.Content>
			</Tabs.Root>
		{:else}
			<div class="p-4 text-center text-sm text-muted-foreground">
				Select a block to edit its properties
			</div>
		{/if}
	</Sidebar.GroupContent>
</Sidebar.Group>
