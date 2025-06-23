// components/blockRegistry.js
import dynamic from "next/dynamic";

const blockRegistry = {
  HomepagecontentFlexibleContentTextblockLayout: dynamic(() =>
    import("../../blocks/TextBlock")
  ),
  HomepagecontentFlexibleContentImageblockLayout: dynamic(() =>
    import("../../blocks/ImageBlock")
  ),
  HomepagecontentFlexibleContentHeroSectionWithLogoLayout: dynamic(() =>
    import("../../blocks/HeroSectionWithLogo")
  ),
  
  // Add more blocks dynamically
};

export default blockRegistry;
