/**
 * @file Core 初始化
 * @module common/core/init
 */

$.PortalCore.init = () => {
  if (!$.PortalCore.helpers) return

  typeof $.PortalCore.helpers.extendJQuery === 'function' && $.PortalCore.helpers.extendJQuery()

  window.addEventListener('load', () => {})
}
