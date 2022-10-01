/**
 * @file 工具方法、应用无关
 * @module common/core/utils
 */

$.PortalView.utils = {
  noop () {},

  isFn (val) {
    return typeof val === `function`
  },

  isDef (val) {
    return val !== undefined
  },

  getUrlParams (url = window.location.href) {
    const search = url.split(`?`)[1]
    if (!search) return {}
    return JSON.parse(
      `{"${decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`,
    )
  },
  formatTime (val, fmt = `yyyy-MM-dd`) {
    if (!val) return ``

    const isUnixTimeStamp = typeof val === `number` && String(val).length === 10
    isUnixTimeStamp && (val *= 1000)

    const time = new Date(val)
    const obj = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': ~~((time.getMonth() + 3) / 3),
      S: time.getMilliseconds(),
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (`${time.getFullYear()}`).substr(4 - RegExp.$1.length),
      )
    }

    for (const k in obj) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? obj[k]
            : (`00${obj[k]}`).substr((`${obj[k]}`).length),
        )
      }
    }

    return fmt
  },
}
