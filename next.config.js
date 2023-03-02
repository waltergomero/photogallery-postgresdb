module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      secret: 'QyNsdWlzYTE5NjE=' //https://www.base64encode.org/
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  }
}

