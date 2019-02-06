const withCSS = require('@zeit/next-css')
const customMapping = {
    exportPathMap: async function (defaultPathMap) {
        return {
            '/': { page: '/login' }
        }
    }
}
module.exports = withCSS(customMapping)