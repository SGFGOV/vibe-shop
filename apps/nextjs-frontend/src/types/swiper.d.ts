// Type declaration to help TypeScript resolve swiper module types
// This works around the package.json exports field issue with moduleResolution: "bundler"
declare module "swiper" {
  interface SwiperModule {
    name: string;
  }
  
  // Re-export the actual Swiper class type from swiper types
  export type Swiper = import("swiper/types/swiper-class").default;
  
  export const Autoplay: SwiperModule;
  export const Pagination: SwiperModule;
  export const Navigation: SwiperModule;
  export const Controller: SwiperModule;
  export const EffectFade: SwiperModule;
  export const EffectCoverflow: SwiperModule;
  export const EffectCube: SwiperModule;
  export const EffectFlip: SwiperModule;
  export const EffectCreative: SwiperModule;
  export const EffectCards: SwiperModule;
  export const A11y: SwiperModule;
  export const HashNavigation: SwiperModule;
  export const History: SwiperModule;
  export const Keyboard: SwiperModule;
  export const Lazy: SwiperModule;
  export const Mousewheel: SwiperModule;
  export const Parallax: SwiperModule;
  export const Scrollbar: SwiperModule;
  export const Thumbs: SwiperModule;
  export const Virtual: SwiperModule;
  export const Zoom: SwiperModule;
  export const FreeMode: SwiperModule;
  export const Grid: SwiperModule;
  export const Manipulation: SwiperModule;
}

