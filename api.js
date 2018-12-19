const api = {}

api.hello = {
  get ({ setStatusCode }) {
    setStatusCode(204)
  },
  post ({ request }) {
    return {
      welcomeMessage: `Welcome to the new born API. You just called \`${request.endpoint}\`.`,
    }
  },
}

// Just for demonstrating async handlers
api.delayed = {
  get () {
    const delayedBy = 1000
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ delayedBy })
      }, delayedBy)
    })
  },
}

module.exports = api
