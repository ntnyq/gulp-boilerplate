/**
 * @see https://github.com/Wenqer/gulp-base64
 */

declare module 'gulp-base64' {
  interface GulpBase64Options {
    baseDir?: string
    extensions?: RegExp[] | string[]
    maxImageSize?: number
    exclude?: RegExp[] | string[]
    debug?: boolean
  }

  declare function base64(options?: GulpBase64Options): NodeJS.ReadWriteStream

  export = base64
}
