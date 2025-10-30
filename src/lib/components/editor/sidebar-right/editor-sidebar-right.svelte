<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root
	bind:ref
	collapsible="none"
	class="hidden h-full border-l lg:flex shrink-0 overflow-hidden"
	{...restProps}
>
	<Sidebar.Header class="border-sidebar-border ">
	</Sidebar.Header>
	<Sidebar.Content class="overflow-y-auto">
	
	</Sidebar.Content>
	<Sidebar.Footer>

	</Sidebar.Footer>
</Sidebar.Root>
