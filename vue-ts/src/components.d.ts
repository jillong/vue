
export {}

declare module 'vue' {
  export interface GlobalComponents {
    MDView: typeof import('./components/MDView.vue')['default']
  }
}
