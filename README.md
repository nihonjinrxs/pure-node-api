# Pure Node.js RESTful API

This project is a RESTful API built only using Node.js core libraries, with no external package dependencies.

This was built as an assignment for the [Pirple NodeJS Master Class]().

## Requirements

* The API listens on a port and accepts incoming HTTP requests for POST, GET, PUT, DELETE, and HEAD.
* The API allows a client to connect, then create a new user, then edit and delete that user.
* The API allows a user to "sign in", which gives them a token that they can use for subsequent authenticated requests.
* The API allows the user to "sign out", which invalidates their token.
* The API allows a signed-in user to use their token to create a new "check".
  * A "check" is a new task to be performed by the API to validate whether a specific URI is "up" or "down".
  * What it means to be "up" or "down" is defined by the API user (i.e., receive a 200 specifically, or receive a non-5xx response).
* The API allows a signed-in user to edit or delete any of their checks.
* The API limits the number of checks a user can create at any given time to 5.
* In the background, workers perform all the "check" tasks at appropriate times (generally once per minute), and send SMS alerts to users when a check changes its state from "up" to "down", or vice versa.
* SMS messages will be sent via the Twilio service, but integration of that service will be done directly via the API, not using a library.
* For simplicity, storage will be handled via a "key-value store"-like use of JSON documents stored on the file system.

## License

This code is licensed with the MIT License.
