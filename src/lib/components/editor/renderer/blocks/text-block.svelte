<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";

  let { element }: { element: BuilderElement } = $props();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    editorManager.selectElement(element.id);
  };

  const isSelected = $derived(editorManager.selectedElementId === element.id);

  const text = $derived(element.properties.content?.text || "Text");

  const getStyles = () => {
    const styles: string[] = [];
    const { design } = element.properties;

    if (design?.typography?.font_size?.breakpoint_base) {
      const size = design.typography.font_size.breakpoint_base;
      styles.push(`font-size: ${size.value}${size.unit}`);
    }

    if (design?.typography?.color?.breakpoint_base) {
      styles.push(`color: ${design.typography.color.breakpoint_base}`);
    }

    if (design?.typography?.text_align?.breakpoint_base) {
      styles.push(`text-align: ${design.typography.text_align.breakpoint_base}`);
    }

    return styles.join("; ");
  };
</script>

<p
  data-element-id={element.id}
  data-element-type={element.type}
  class="relative cursor-pointer"
  class:ring-2={isSelected}
  class:ring-blue-500={isSelected}
  style={getStyles()}
  onclick={handleClick}
  role="button"
  tabindex="0"
>
  {text}
</p>

