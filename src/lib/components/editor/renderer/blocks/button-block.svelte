<script lang="ts">
  import type { BuilderElement } from "$lib/types/block";
  import {
    createClickHandler,
    isElementSelected,
    extractAllStyles,
    getLeafBlockClasses,
    getTextContent,
    combineStyles
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  const handleClick = createClickHandler(element.id);
  const isSelected = $derived(isElementSelected(element.id));
  const text = $derived(getTextContent(element, "Button"));
  const styles = $derived(
    combineStyles(
      [extractAllStyles(element.properties.design)],
      ['cursor: pointer', 'border: none']
    )
  );
</script>

<button
  data-element-id={element.id}
  data-element-type={element.type}
  class={getLeafBlockClasses(isSelected)}
  style={styles}
  onclick={handleClick}
  type="button"
>
  {text}
</button>

