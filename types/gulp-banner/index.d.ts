/// <reference types="node" />

declare module 'gulp-banner' {
  interface GulpBannerOptions {

  }

  declare function banner (comment: string, options?: GulpBannerOptions): NodeJS.ReadWriteStream

  export = banner
}
