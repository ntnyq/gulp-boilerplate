/**
 * @file 首页
 * @module home/index
 */

$(() => {
  const { helpers } = $.PortalCore

  $.PortalView = {
    initDemoBtn () {
      $(`#btn_demo`).on(`click`, () => {
        helpers.useTip(`测试交互`)
      })
    },

    init () {
      this.initDemoBtn()
    },
  }

  $.PortalView.init()
})
