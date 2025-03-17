/**
 * @see https://github.com/Wenqer/gulp-base64
 */

declare module 'gulp-base64' {
  interface GulpBase64Options {
    baseDir?: string
    debug?: boolean
    exclude?: RegExp[] | string[]
    extensions?: RegExp[] | string[]
    maxImageSize?: number
  }

  declare function base64(options?: GulpBase64Options): NodeJS.ReadWriteStream

  export = base64
}
