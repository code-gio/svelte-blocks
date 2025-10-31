<script lang="ts">
  import type { BuilderElement } from "$lib/types/editor";
  import { editorManager } from "$lib/components/editor/editor-manager.svelte.js";

  let { element }: { element: BuilderElement } = $props();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    editorManager.selectElement(element.id);
  };

  const isSelected = $derived(editorManager.selectedElementId === element.id);

  const text = $derived(element.properties.content?.text || "Button");

  const getStyles = () => {
    const styles: string[] = [];
    const { design } = element.properties;

    if (design?.spacing?.padding?.breakpoint_base) {
      const p = design.spacing.padding.breakpoint_base;
      if (p.all) {
        styles.push(`padding: ${p.all.value}${p.all.unit}`);
      } else {
        if (p.top) styles.push(`padding-top: ${p.top.value}${p.top.unit}`);
        if (p.right) styles.push(`padding-right: ${p.right.value}${p.right.unit}`);
        if (p.bottom) styles.push(`padding-bottom: ${p.bottom.value}${p.bottom.unit}`);
        if (p.left) styles.push(`padding-left: ${p.left.value}${p.left.unit}`);
      }
    }

    if (design?.background?.color?.breakpoint_base) {
      styles.push(`background-color: ${design.background.color.breakpoint_base}`);
    }

    if (design?.typography?.color?.breakpoint_base) {
      styles.push(`color: ${design.typography.color.breakpoint_base}`);
    }

    if (design?.border?.border_radius?.breakpoint_base?.all) {
      const radius = design.border.border_radius.breakpoint_base.all;
      styles.push(`border-radius: ${radius.value}${radius.unit}`);
    }

    styles.push("cursor: pointer");
    styles.push("border: none");

    return styles.join("; ");
  };
</script>

<button
  data-element-id={element.id}
  data-element-type={element.type}
  class="relative transition-all duration-150"
  class:ring-2={isSelected}
  class:ring-blue-500={isSelected}
  class:hover:outline={!isSelected}
  class:hover:outline-2={!isSelected}
  class:hover:outline-dashed={!isSelected}
  class:hover:outline-gray-400={!isSelected}
  class:hover:outline-offset-2={!isSelected}
  style={getStyles()}
  onclick={handleClick}
  type="button"
>
  {text}
</button>

