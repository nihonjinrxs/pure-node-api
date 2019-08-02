/**
 * Primary file for the API, kicks everything else off
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const util = require('util');

// The server responds to all requests with a string.
const server = http.createServer((req, res) => {
  const startTime = Date.now();

  // Get URL and parse it.
  const parsedUrl = url.parse(req.url, true);

  // Get path
  const requestPath = parsedUrl.pathname;
  const trimmedPath = requestPath.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryObject = parsedUrl.query;

  // Get the headers as an object
  const headers = req.headers;

  // Get the HTTP method
  const method = req.method.toUpperCase();

  // Get the payload if there is any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => { buffer += decoder.write(data); });
  req.on('end', () => {
    // End buffer
    buffer += decoder.end();

    // Choose the handler to handle the request (or use notFound)
    const handler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    const handlerData = {
      trimmedPath: trimmedPath,
      queryObject: queryObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    handler(handlerData, (status, responsePayload) => {
      // Use status code, or default to 200
      const statusCode = typeof (status) === 'number' ? status : 200;
      // Check if the responsePayload has data
      const payload = typeof (responsePayload) === 'object' ? responsePayload : {};
      const payloadString = JSON.stringify(payload);
      // Send response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log request
      const elapsed = Date.now() - startTime;
      console.log(`Received ${method} request for path: ${trimmedPath} with query parameters: ${util.inspect(queryObject)}, with headers ${util.inspect(headers)}, and with request payload: '${buffer}'\nResponded in ${elapsed}ms with status ${statusCode} and response payload: '${payloadString}`);
    });
  });
});

// Start the server and have it listen on a port (default 3000).
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`The server is listening on port ${port}.`);
});

// Define request handlers
const handlers = {
  sample: (data, callback) => {
    // Handle request using data
    const status = 406;
    const payload = {
      name: 'sample handler',
      data: data
    };

    // Callback an http status code and a payload object
    callback(status, payload);
  },
  notFound: (_data, callback) => {
    callback(404);
  }
};

// Define a request router
const router = {
  sample: handlers.sample
}
