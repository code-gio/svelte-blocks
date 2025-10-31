<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import type { BuilderElement } from '$lib/types/block';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import { getBlockFieldConfig, getNestedValue, setNestedValue } from './field-configs';
	import FieldRenderer from './field-renderer.svelte';

	interface Props {
		element: BuilderElement;
		tab: 'content' | 'design' | 'advanced';
	}

	let { element, tab }: Props = $props();

	const fieldConfig = $derived(getBlockFieldConfig(element.type));
	const fields = $derived(
		tab === 'content'
			? fieldConfig.content || []
			: tab === 'design'
				? fieldConfig.design || []
				: fieldConfig.advanced || []
	);

	const handleFieldChange = (key: string, value: unknown) => {
		// Clone the element properties
		const updatedProperties = JSON.parse(JSON.stringify(element.properties));

		// Set the nested value
		setNestedValue(updatedProperties as Record<string, unknown>, key, value);

		// Update the element
		editorManager.updateElementProperties(element.id, updatedProperties);
	};

	const getFieldValue = (key: string): unknown => {
		return getNestedValue(element.properties, key);
	};
</script>

<div class="space-y-4 p-4">
	<Field.Group>
		{#each fields as field (field.key)}
			<FieldRenderer
				config={field}
				value={getFieldValue(field.key)}
				onchange={(value) => handleFieldChange(field.key, value)}
			/>
		{/each}
	</Field.Group>
</div>

