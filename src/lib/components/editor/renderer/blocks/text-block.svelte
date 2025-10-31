<script lang="ts">
  import type { BuilderElement } from "$lib/types/block";
  import {
    createClickHandler,
    isElementSelected,
    extractAllStyles,
    getLeafBlockClasses,
    getTextContent,
    getHtmlId,
    getCssClasses
  } from './block-utils';

  let { element }: { element: BuilderElement } = $props();

  const handleClick = createClickHandler(element.id);
  const isSelected = $derived(isElementSelected(element.id));
  const text = $derived(getTextContent(element, "Text"));
  const styles = $derived(extractAllStyles(element.properties.design));
  const htmlId = $derived(getHtmlId(element));
  const customClasses = $derived(getCssClasses(element));
  const combinedClasses = $derived(
    [getLeafBlockClasses(isSelected), customClasses].filter(Boolean).join(' ')
  );
</script>

<p
  data-element-id={element.id}
  data-element-type={element.type}
  id={htmlId}
  class={combinedClasses}
  style={styles}
  onclick={handleClick}
  role="button"
  tabindex="0"
>
  {text}
</p>

