<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
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

<Collapsible.Root bind:open={isOpen}>
	<Collapsible.Trigger
		class="flex w-full items-center justify-between rounded-md py-2 px-3 text-sm font-medium hover:bg-accent"
	>
		<span>{group.label}</span>
		<ChevronDown
			class="h-4 w-4 transition-transform duration-200"
			style={isOpen ? 'transform: rotate(180deg)' : ''}
		/>
	</Collapsible.Trigger>
	<Collapsible.Content class="space-y-4 px-3 py-2">
		{#each group.fields as field (field.key)}
			<FieldRenderer
				config={field}
				value={getFieldValue(field.key)}
				onchange={(value) => handleFieldChange(field.key, value)}
			/>
		{/each}
	</Collapsible.Content>
</Collapsible.Root>

