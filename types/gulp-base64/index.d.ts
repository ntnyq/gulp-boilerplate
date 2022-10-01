/// <reference types="node" />

declare module 'gulp-base64' {
  interface GulpBase64Options {
    extensions: string[]
    maxImageSize: number
  }

  declare function base64 (options?: GulpBase64Options): NodeJS.ReadWriteStream

  export = base64
}
