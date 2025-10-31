<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Info } from '@lucide/svelte';
	import type { FieldConfig } from './field-configs';

	interface Props {
		config: FieldConfig;
		value: unknown;
		onchange: (value: unknown) => void;
	}

	let { config, value, onchange }: Props = $props();

	const currentValue = $derived(value ?? config.defaultValue);

	// Special handling for CSS classes (stored as array, displayed as string)
	const stringValue = $derived(
		config.key === 'settings.advanced.css_classes'
			? Array.isArray(currentValue)
				? currentValue.join(' ')
				: String(currentValue ?? '')
			: String(currentValue ?? '')
	);

	const numberValue = $derived(Number(currentValue) || 0);
	const booleanValue = $derived(Boolean(currentValue));

	// Convert string back to array for CSS classes
	const handleChange = (val: unknown) => {
		if (config.key === 'settings.advanced.css_classes' && typeof val === 'string') {
			const classes = val.trim() ? val.trim().split(/\s+/) : [];
			onchange(classes);
		} else {
			onchange(val);
		}
	};

	// For Select component - bind:value approach
	let selectValue = $state('');

	// Initialize and watch for external value changes
	$effect(() => {
		selectValue = stringValue;
	});

	// Watch for selectValue changes and propagate to parent
	$effect(() => {
		if (selectValue && selectValue !== stringValue) {
			handleChange(selectValue);
		}
	});
</script>

<Field.Field>
	<div class="flex items-center gap-2">
		<Field.Label for={config.key} class="text-xs font-medium">{config.label}</Field.Label>
		{#if config.description}
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger class="inline-flex">
						<Info class="h-3 w-3 text-muted-foreground" />
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">{config.description}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		{/if}
	</div>

	{#if config.type === 'text'}
		<Input
			id={config.key}
			type="text"
			value={stringValue}
			placeholder={config.placeholder}
			onchange={(e) => handleChange(e.currentTarget.value)}
		/>
	{:else if config.type === 'textarea'}
		<Textarea
			id={config.key}
			value={stringValue}
			placeholder={config.placeholder}
			onchange={(e) => handleChange(e.currentTarget.value)}
			class="resize-none"
		/>
	{:else if config.type === 'number'}
		<Input
			id={config.key}
			type="number"
			value={numberValue}
			min={config.min}
			max={config.max}
			step={config.step}
			onchange={(e) => handleChange(Number(e.currentTarget.value))}
		/>
	{:else if config.type === 'color'}
		<div class="flex gap-2">
			<Input
				id={config.key}
				type="color"
				value={stringValue}
				onchange={(e) => handleChange(e.currentTarget.value)}
				class="h-10 w-20"
			/>
			<Input
				type="text"
				value={stringValue}
				onchange={(e) => handleChange(e.currentTarget.value)}
				placeholder="#000000"
			/>
		</div>
	{:else if config.type === 'select' && config.options}
		{@const triggerContent =
			config.options.find((opt) => String(opt.value) === selectValue)?.label || 'Select...'}
		<Select.Root type="single" bind:value={selectValue}>
			<Select.Trigger id={config.key} class="w-full">
				{triggerContent}
			</Select.Trigger>
			<Select.Content>
				{#each config.options as option (option.value)}
					<Select.Item value={String(option.value)} label={option.label}>
						{option.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{:else if config.type === 'checkbox'}
		<div class="flex items-center gap-2">
			<Checkbox
				id={config.key}
				checked={booleanValue}
				onchange={(checked) => handleChange(checked)}
			/>
		</div>
	{/if}
</Field.Field>
