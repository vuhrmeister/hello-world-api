const http = require('http')
var url = require('url')
var api = require('./api')

const SERVER_PORT = 3000

/**
 * If no status code is set by the handler
 * this one will be set on the response.
 */
const DEFAULT_STATUS_CODE = 200

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const endpoint = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
  const method = req.method.toLowerCase()

  // Might get overridden by the handler
  let statusCode = DEFAULT_STATUS_CODE

  // The bag will be passed as a single argument to the handler
  // We could put more stuff into it that might be relevant for handlers.
  const bag = {
    request: {
      endpoint,
    },
    setStatusCode (code) {
      if (typeof code === 'number') {
        statusCode = code
      } else {
        console.warn(`Wrong status code: ${code} - ${DEFAULT_STATUS_CODE} will be used.`)
      }
    },
  }

  const handler = getHandler(endpoint, method)

  try {
    let result = await handler(bag)

    // Ensure we send a proper JSON object in the response
    if (typeof result !== 'object') {
      if (typeof result !== 'undefined') {
        console.warn('Return value of the handler must be an object. Will return an empty object now.')
      }
      result = {}
    }

    const resultString = JSON.stringify(result)

    res.setHeader('Content-Type', 'application/json')
    res.writeHead(statusCode)
    res.end(resultString)
  } catch (error) {
    console.error(error)
    res.writeHead(500)
    res.end()
  }
})

server.listen(SERVER_PORT, () => {
  console.log(`The server is up and running now on port ${SERVER_PORT}`)
})

function getHandler (path, method) {
  const endpoint = api[path]

  if (endpoint && typeof endpoint[method] === 'function') {
    return handler = endpoint[method]
  }

  return notFoundHandler
}

function notFoundHandler ({ setStatusCode }) {
  setStatusCode(404)
}
