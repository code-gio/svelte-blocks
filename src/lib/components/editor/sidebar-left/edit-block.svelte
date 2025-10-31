<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import { getBlockById } from '$lib/components/editor/renderer/blocks/index.js';

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
		<Tabs.Root value="account">
			<Tabs.List class="w-full">
				<Tabs.Trigger value="account">Content</Tabs.Trigger>
				<Tabs.Trigger value="design">Design</Tabs.Trigger>
				<Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="content">Make changes to your account here.</Tabs.Content>
			<Tabs.Content value="design">Change your password here.</Tabs.Content>
			<Tabs.Content value="advanced">Change your password here.</Tabs.Content>
		</Tabs.Root>
	</Sidebar.GroupContent>
</Sidebar.Group>
