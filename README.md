# Hello World API

This is just a very basic version of a RESTful JSON API running on Node.js.

## How To

Just put your request handlers into [api.js](./api.js) like so:

```javascript
api.yourEndpointName = {
  get () {
    return {
      some: 'json',
    }
  },
  post (bag) {
    return {
      endpoint: bag.endpoint,
    }
  },
}
```

`yourEndpintName` will be the path you are calling: `http://localhost/yourEndpointName`.
Inside that object you define your methods you want to work on that endpoint.

You might also return a promise if you have async operations.

### The `bag`

```javascript
{
  request: {
    endpoint: 'yourEndpointName',
  },
  // Set a status code. If not set, 200 will be used.
  setStatusCode (code) {},
}
```
