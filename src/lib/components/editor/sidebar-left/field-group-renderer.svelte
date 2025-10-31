<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChevronDown } from '@lucide/svelte';
	import type { FieldGroup } from './field-configs';
	import FieldRenderer from './field-renderer.svelte';

	interface Props {
		group: FieldGroup;
		getFieldValue: (key: string) => unknown;
		handleFieldChange: (key: string, value: unknown) => void;
	}

	let { group, getFieldValue, handleFieldChange }: Props = $props();

	let isOpen = $state(group.defaultOpen ?? false);
</script>

<Sidebar.MenuItem>
	<Sidebar.MenuButton
		onclick={() => (isOpen = !isOpen)}
		class="flex w-full items-center justify-between"
	>
		<span>{group.label}</span>
		<ChevronDown
			class="h-4 w-4 transition-transform duration-200"
			style={isOpen ? 'transform: rotate(180deg)' : ''}
		/>
	</Sidebar.MenuButton>
	{#if isOpen}
		<Sidebar.MenuSub>
			{#each group.fields as field (field.key)}
				<Sidebar.MenuSubItem>
					<FieldRenderer
						config={field}
						value={getFieldValue(field.key)}
						onchange={(value) => handleFieldChange(field.key, value)}
					/>
				</Sidebar.MenuSubItem>
			{/each}
		</Sidebar.MenuSub>
	{/if}
</Sidebar.MenuItem>
