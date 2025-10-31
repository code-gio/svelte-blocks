<script lang="ts">
  import type { BuilderElement } from "$lib/types/block";
  import {
    createClickHandler,
    isElementSelected,
    extractAllStyles,
    getLeafBlockClasses,
    getTextContent,
    getTag
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  const handleClick = createClickHandler(element.id);
  const isSelected = $derived(isElementSelected(element.id));
  const tag = $derived(getTag(element, "h2"));
  const text = $derived(getTextContent(element, "Heading"));
  const styles = $derived(extractAllStyles(element.properties.design));
</script>

<svelte:element
  this={tag}
  data-element-id={element.id}
  data-element-type={element.type}
  class={getLeafBlockClasses(isSelected)}
  style={styles}
  onclick={handleClick}
  role="button"
  tabindex="0"
>
  {text}
</svelte:element>

