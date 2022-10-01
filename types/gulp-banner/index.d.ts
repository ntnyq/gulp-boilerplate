/// <reference types="node" />

/**
 * @link https://github.com/superRaytin/gulp-banner
 */

declare module 'gulp-banner' {
  type GulpBannerOptions = Record<string, any>

  declare function banner (
    comment: string,
    options?: GulpBannerOptions,
  ): NodeJS.ReadWriteStream

  export = banner
}
