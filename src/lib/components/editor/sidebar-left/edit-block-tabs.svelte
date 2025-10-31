<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { BuilderElement } from '$lib/types/block';
	import { editorManager } from '$lib/components/editor/editor-manager.svelte.js';
	import type { FieldConfig, FieldGroup } from './field-configs';
	import {
		getBlockFieldConfig,
		getNestedValue,
		setNestedValue,
		isFieldGroup
	} from './field-configs';
	import FieldRenderer from './field-renderer.svelte';
	import FieldGroupRenderer from './field-group-renderer.svelte';

	interface Props {
		element: BuilderElement;
		tab: 'content' | 'design' | 'advanced';
	}

	let { element, tab }: Props = $props();

	const fieldConfig = $derived(getBlockFieldConfig(element.type));
	const items = $derived(
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

<Sidebar.Group>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item, index (isFieldGroup(item) ? `group-${index}` : item.key)}
				{#if isFieldGroup(item)}
					<FieldGroupRenderer group={item} {getFieldValue} {handleFieldChange} />
				{:else}
					<Sidebar.MenuItem>
						<div class="px-3 py-2">
							<FieldRenderer
								config={item}
								value={getFieldValue(item.key)}
								onchange={(value) => handleFieldChange(item.key, value)}
							/>
						</div>
					</Sidebar.MenuItem>
				{/if}
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
