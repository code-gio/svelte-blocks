<script lang="ts">
	import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
	import MonitorIcon from "@lucide/svelte/icons/monitor";
	import TabletIcon from "@lucide/svelte/icons/tablet";
	import SmartphoneIcon from "@lucide/svelte/icons/smartphone";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import LayersIcon from "@lucide/svelte/icons/layers";
	import DarkModeToggle from "$lib/components/shared/dark-mode-toggle.svelte";
	import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	const sidebar = Sidebar.useSidebar();
</script>

<header class="bg-background fixed top-0 z-50 flex w-full items-center border-b">
	<div class="h-(--header-height) flex w-full items-center gap-2 justify-between px-2">
		<div class="flex items-center gap-2">
			<Button 
				size="icon" 
				variant={editorManager.leftSidebarMode === "add" ? "secondary" : "ghost"} 
				onclick={() => editorManager.handleAddContentClick({
					open: sidebar.open,
					setOpen: sidebar.setOpen
				})}
				title="Add content"
			>
				<PlusIcon />
			</Button>
			<Separator orientation="vertical" class="h-6!" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
				  <Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href="##">Editing Page</Breadcrumb.Link>
				  </Breadcrumb.Item>
				  <Breadcrumb.Separator class="hidden md:block" />
				  <Breadcrumb.Item>
					<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
				  </Breadcrumb.Item>
				</Breadcrumb.List>
			  </Breadcrumb.Root>
		</div>
		<div class="flex items-center gap-2">
			<Button 
				variant={editorManager.viewMode === "desktop" ? "secondary" : "ghost"}
				size="icon" 
				onclick={() => editorManager.setViewMode("desktop")}
				title="Desktop view"
			>
				<MonitorIcon />
			</Button>
			<Button 
				variant={editorManager.viewMode === "tablet" ? "secondary" : "ghost"}
				size="icon" 
				onclick={() => editorManager.setViewMode("tablet")}
				title="Tablet view"
			>
				<TabletIcon />
			</Button>
			<Button 
				variant={editorManager.viewMode === "mobile" ? "secondary" : "ghost"}
				size="icon" 
				onclick={() => editorManager.setViewMode("mobile")}
				title="Mobile view"
			>
				<SmartphoneIcon />
			</Button>
		</div>
		<div class="flex items-center gap-2">
			<Button 
				variant="ghost" 
				size="icon" 
				onclick={editorManager.toggleRightSidebar}
				title="Toggle right sidebar"
			>
				<LayersIcon />
			</Button>
			<Separator orientation="vertical" class="h-6!" />
			<DarkModeToggle />
		</div>

	</div>
</header>
