<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import SiteHeader from "$lib/components/editor/header/editor-header.svelte";
	import SidebarLeft from "$lib/components/editor/sidebar-left/editor-sidebar-left.svelte";
	import SidebarRight from "$lib/components/editor/sidebar-right/editor-sidebar-right.svelte";
	import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
	
	let { children } = $props();
</script>

<div class="[--header-height:calc(--spacing(14))]">
	<Sidebar.Provider class="flex flex-col h-screen overflow-hidden">
		<SiteHeader />
		<div class="flex flex-1 mt-(--header-height) overflow-hidden">
            <SidebarLeft />
			<Sidebar.Inset class="overflow-y-auto">
				<div class="flex flex-1 flex-col gap-4 p-4">
					{@render children()}
				</div>
			</Sidebar.Inset>
            {#if editorManager.rightSidebarOpen}
				<SidebarRight />
			{/if}
		</div>
	</Sidebar.Provider>
</div>
