import type { Component } from "svelte";
import type { BuilderElement } from "$lib/types/editor";
import SectionBlock from "./blocks/section-block.svelte";
import HeadingBlock from "./blocks/heading-block.svelte";
import TextBlock from "./blocks/text-block.svelte";
import ButtonBlock from "./blocks/button-block.svelte";

type BlockComponent = Component<{ element: BuilderElement }>;

export const BLOCK_COMPONENT_REGISTRY: Record<string, BlockComponent> = {
  section: SectionBlock,
  heading: HeadingBlock,
  text: TextBlock,
  button: ButtonBlock,
};

export const getBlockComponent = (type: string): BlockComponent | null => {
  return BLOCK_COMPONENT_REGISTRY[type] || null;
};
