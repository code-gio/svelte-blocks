<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import { getBlockComponent } from "./block-registry";

  let { element }: { element: BuilderElement } = $props();

  const component = $derived(getBlockComponent(element.type));
</script>

{#if component}
  <svelte:component this={component} {element} />
{:else}
  <div class="p-4 bg-red-100 border border-red-400 text-red-700">
    Unknown block type: {element.type}
  </div>
{/if}

