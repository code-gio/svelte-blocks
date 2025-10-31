<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import type { BuilderElement } from '$lib/types/editor';
	import { getBlockById } from '$lib/components/editor/renderer/block-registry.js';
	import Self from './page-structure-tree.svelte';

	let { element }: { element: BuilderElement } = $props();

	const blockInfo = $derived(getBlockById(element.type));
	const isSelected = $derived(editorManager.selectedElementId === element.id);
	const hasChildren = $derived(element.children.length > 0);

	const handleSelect = () => {
		editorManager.selectElement(element.id);
	};
</script>

{#if hasChildren}
	<Collapsible.Root class="group/collapsible">
		<Sidebar.MenuItem>
			<Collapsible.Trigger class="w-full">
				<Sidebar.MenuButton
					tooltipContent={element.type}
					isActive={isSelected}
					onclick={handleSelect}
				>
					{#if blockInfo?.icon}
						<blockInfo.icon class="size-4" />
					{/if}
					<span class="flex-1 truncate text-left">
						{blockInfo?.name || element.type}
					</span>
					<ChevronRightIcon
						class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
					/>
				</Sidebar.MenuButton>
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Sidebar.MenuSub>
					{#each element.children as child (child.id)}
						<Sidebar.MenuSubItem>
							<Self element={child} />
						</Sidebar.MenuSubItem>
					{/each}
				</Sidebar.MenuSub>
			</Collapsible.Content>
		</Sidebar.MenuItem>
	</Collapsible.Root>
{:else}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton tooltipContent={element.type} isActive={isSelected} onclick={handleSelect}>
			{#if blockInfo?.icon}
				<blockInfo.icon class="size-4" />
			{/if}
			<span class="flex-1 truncate text-left">
				{blockInfo?.name || element.type}
			</span>
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{/if}
