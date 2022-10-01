/**
 * @file 全局通用效果
 * @module common/common
 */

$(() => {
  // const { helpers, constants } = $.PortalCore
  const $doc = $(document)

  $.PortalCommon = {
    initImagePreview () {
      $doc.on('click', 'img[data-image-preview]', function () {
        const $this = $(this)
        const group = $this.data('image-preview')
        let data = []
        let start = 0

        if (group) {
          const $images = $(`img[data-image-preview=${group}]`)
          start = $this.index(`img[data-image-preview=${group}]`)
          data = $.map($images, item => ({
            src: $(item).data('src') || $(item).attr('src'),
          }))
        } else {
          data = [{ src: $this.data('src') || $this.attr('src') }]
        }

        const photos = { data, start }
        layui.layer.photos({ photos, start, anim: 5, move: false })
      })
    },

    init () {
      this.initImagePreview()
    },
  }

  $.PortalCommon.init()
})
