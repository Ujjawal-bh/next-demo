// components/BlockRenderer.js
import blockRegistry from "./blockRegistry";

export default function BlockRenderer({ blocks }) {
  console.log("blocks", blocks);
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block, index) => {
    const BlockComponent = blockRegistry[block.__typename];

    if (!BlockComponent) {
      console.warn(`No component found for ${block.__typename}`);
      return null;
    }

    return <BlockComponent key={index} {...block} />;
  });
}
