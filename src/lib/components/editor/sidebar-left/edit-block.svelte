<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import { getBlockById } from '$lib/components/editor/renderer/block-registry.js';
	import { getBlockFieldConfig, countFields } from './field-configs';
	import EditBlockTabs from './edit-block-tabs.svelte';

	const selectedElement = $derived(
		editorManager.selectedElementId
			? editorManager.findElementById(editorManager.selectedElementId)
			: null
	);

	const blockInfo = $derived(selectedElement ? getBlockById(selectedElement.type) : null);
	const elementLabel = $derived(blockInfo?.name || selectedElement?.type || 'Block');

	// Check which tabs have fields (count fields in groups too)
	const fieldConfig = $derived(selectedElement ? getBlockFieldConfig(selectedElement.type) : null);
	const hasContentFields = $derived(countFields(fieldConfig?.content || []) > 0);
	const hasDesignFields = $derived(countFields(fieldConfig?.design || []) > 0);

	// Determine default tab (first available tab)
	const defaultTab = $derived(
		hasContentFields ? 'content' : hasDesignFields ? 'design' : 'advanced'
	);
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
			<Tabs.Root value={defaultTab} class="w-full">
				<Tabs.List class="w-full">
					{#if hasContentFields}
						<Tabs.Trigger value="content">Content</Tabs.Trigger>
					{/if}
					{#if hasDesignFields}
						<Tabs.Trigger value="design">Design</Tabs.Trigger>
					{/if}
					<Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
				</Tabs.List>
				{#if hasContentFields}
					<Tabs.Content value="content">
						<EditBlockTabs element={selectedElement} tab="content" />
					</Tabs.Content>
				{/if}
				{#if hasDesignFields}
					<Tabs.Content value="design">
						<EditBlockTabs element={selectedElement} tab="design" />
					</Tabs.Content>
				{/if}
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
