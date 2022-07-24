const api = require(`./api/index.js`)
const { wrapApiData } = require(`./util.js`)

/**
 * 配置说明请参考文档: 
 * https://hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = util => {
  return {
    guard: false,
    port: 9000,
    testPort: 9005,
    replayPort: 9001,
    watch: [`./api/`],
    apiWeb: `./apiWeb.json`,
    proxy: {
      '/': `http://www.httpbin.org/`, // 后端接口主域
      '/anything/intercept': [`origin`, `127.0.0.1`], // 修改接口返回的数据
    },
    api: {
      // 在其他文件里的 api
      ...api(util).api,
      
      // 使用 mockjs 生成数据
      '/api/user/login' (req, res) {
        const json = util.libObj.mockjs.mock({
          code: 0,
          data: {
            userId: '@id',
            userName: 'admin',
            mobile: /^1[3456789]\d{9}$/,
            accessToken: '@guid',
            refreshToken: '@guid',
          },
        })
        res.json(json)
      },

      '/api/user/logout' (req, res) {
        res.json({
          code: 0,
          data: null,
        });
      },
    },
    static: [],
    resHandleReplay: ({req, res}) => wrapApiData({code: 200, data: {}}),
    resHandleJsonApi: ({req, res: {statusCode: code}, data}) => wrapApiData({code, data}),
  }
}
