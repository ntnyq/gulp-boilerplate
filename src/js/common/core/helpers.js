/**
 * @file 辅助方法、应用有关
 * @module common/core/helpers
 */

$.PortalCore.helpers = {
  // 扩展jQuery
  extendJQuery () {
    $.fn.extend({

    })
  },

  useAppState () {

  },

  useStyle () {

  },

  useScript () {

  },

  useHash () {
    const { helpers } = $.PortalCore
    const dfd = $.Deferred()

    helpers.ajax({
      url: `/utils/hash`,
      hideLoading: true,
    }).done(res => {
      if (res) {
        dfd.resolve(res)
      } else {
        dfd.reject(new Error(`No hash in response`))
      }
    }).fail(dfd.reject)

    return dfd.promise()
  },

  goRoute (path, {
    delay,
  } = {}) {
    const { constants } = $.PortalCore
    setTimeout(() => {
      window.location.href = path
    }, delay || constants.GO_ROUTE_DEFAULT_DELAY)
  },

  ajax (options) {
    const { constants, utils, helpers, tips } = $.PortalCore
    const defaultOptions = {
      timeout: constants.HTTP_REQUEST_TIMEOUT,
      dataType: `json`,
      beforeSend (xhr) {
        const xCsrfToken = $(`meta[name="X-CSRF-TOKEN"]`).attr(`content`)
        xCsrfToken && xhr.setRequestHeader('X-CSRF-TOKEN', xCsrfToken)
      },
    }
    const opts = $.extend(defaultOptions, options)
    const dfd = $.Deferred()
    let layerInstance = null

    if (!options.hideLoading) {
      layerInstance = layui.layer.load(1, { shade: 0.3 })
    }

    $.ajax(opts)
      .done(({ status, data }) => {
        if (utils.isDef(status) && utils.isDef(data)) {
          switch (status) {
            case constants.HTTP_REQUEST_SUCCESS_CODE:
              dfd.resolve(data)
              break

            case constants.HTTP_REQUEST_ERROR_CODE: {
              !opts.noErrorTip && helpers.useTip(data.detail)
              dfd.reject(data)
              console.log(data) // Debug
              break
            }

            default:
              helpers.useTip(tips.HTTP_RESPONSE_STATUS_UNEXPECTED)
              break
          }
        } else {
          dfd.reject(new Error(tips.HTTP_RESPONSE_NO_STATUS))
          helpers.useTip(tips.HTTP_RESPONSE_NO_STATUS)
        }
      })
      .fail(err => {
        dfd.reject(err)
        console.log(err)
      })
      .always(() => {
        if (!layerInstance) return
        layui.layer.close(layerInstance)
      })
  },

  useTip (msg, opts = {}) {
    const dfd = $.Deferred()
    const layerIndex = layui.layer.msg(msg, $.extend({}, opts))

    dfd.resolve(layerIndex)
    return dfd.promise()
  },

  useAlert (content, opts = {}) {
    const dfd = $.Deferred()
    const defaultOptions = {
      title: '提示',
      skin: 'qxy-alert',
      closeBtn: false,
      move: false,
      autoClose: true,
    }
    const options = $.extend({}, defaultOptions, opts)
    layui.layer.alert(content, options, layerIndex => {
      options.autoClose && layui.layer.close(layerIndex)
      dfd.resolve(layerIndex)
    })

    return dfd.promise()
  },

  useConfirm (content, opts = {}) {
    const dfd = $.Deferred()
    const defaultOptions = {
      title: '提示',
      skin: 'qxy-confirm',
      btn: ['取消', '确定'],
      icon: 3,
      shade: 0.4,
      move: false,
    }
    const options = $.extend({}, defaultOptions, opts)
    const layerIndex = layui.layer.confirm(
      content,
      options,
      () => {
        layui.layer.close(layerIndex)
        dfd.reject()
      },
      () => {
        layui.layer.close(layerIndex)
        dfd.resolve()
      },
    )

    return dfd.promise()
  },

  usePrompt () {},

  usePopContainer (content, opts = {}) {
    const dfd = $.Deferred()
    const defaultOptions = {
      type: 1,
      title: false,
      closeBtn: 0,
      shadeClose: true,
      move: false,
    }
    const options = $.extend({}, defaultOptions, opts)

    layui.layer.open({
      content,
      success () {
        dfd.resolve()
      },
      ...options,
    })

    return dfd.promise()
  },
}
