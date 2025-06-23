// components/blockRegistry.js
import dynamic from "next/dynamic";

const blockRegistry = {
    PageAcfflexibleBlocksFlexibleContentTextblockLayout: dynamic(() =>
    import("../../blocks/TextBlock")
  ),
  PageAcfflexibleBlocksFlexibleContentImageblockLayout: dynamic(() =>
    import("../../blocks/ImageBlock")
  ),

  PageAcfflexibleBlocksFlexibleContentPrimaryHeroSectionLayout: dynamic(() =>
    import("../../blocks/PrimarHeroSection")
  ),
  // Add more blocks dynamically
};

export default blockRegistry;
