<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://seeklogo.com/images/G/google-meet-logo-3EBB5BEC63-seeklogo.com.png" alt="Project logo"></a>
</p>

<h3 align="center">meet api via calender api</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/SahilKr24/meet-api)](https://github.com/SahilKr24/meet-api/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/SahilKr24/meet-api)](https://github.com/SahilKr24/meet-api/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">This API added calender events that have a google meet link embedded.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This API uses your Google credentials to create an Oauth Object which returns an url for authentication`(/url)`. After authentication the URL redirect back to localhost which is captured and then processed to generate a token that is returned. 

Using that token, we can set credentials in an Oauth Client `(/auth)` using which we can then use the calendar API to create events using form data in JSON payload.

Every time an event is created in Google Calendar it is assigned an Meet Link automatically. That meet id can be fetched to create meet sessions as per need.

While adding events to Google Calendar other attendees can be also added thus enabling users to implement large scale group meetings by directly putting the events in the attendees calendars.

## 🏁 Getting Started <a name = "getting_started"></a>

In order to use this API we need to generate Google credentials for calendar with Scope as a web app. 

After you have received your credentials you need to change the last item that is "redirect_uris" to **["http://localhost:3000/auth"]** so that when the authorisation is successful, google redirects to the localhost so that we can capture the access token and generated an oauth token.

### Prerequisites

Generate credentials.json for google calender using Google API Dashboard.

```
credentials.json
```

### Installing

Follow the following steps to get a development env running.

First step will be to 

```
npm install
```

And then execute

```
npm run dev
```

## 🎈 Usage <a name="usage"></a>

This API uses `POST` and `GET` requests to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indenticate status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

## Response Codes 
### Response Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
50X: Server Error
```
### Error Codes Details
```
100: Bad Request
110: Unauthorized
120: User Authenticaion Invalid
130: Parameter Error
140: Item Missing
150: Conflict
160: Server Error
```
## /url
**You get:** An url with link for `O-Auth`.

## /auth
**You send:**  Your `Access Token`
**You get:** An `O-Auth Token`.

## /create
**You get:** A form to create an event.

## /events
**You send:**  Your Generated Token
**You get:** A list of  `Event-Objects` with Meet IDs.

## /createEvent
**You send:**  Your event creation parameters.
**You get:** An `Event-Object` with Meet ID.

**Request:**
```json
POST /createEvent HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
  "name":"name of the event",
  "code":"any code to differentiate",
  "date":"date of the event",
  "stime":"starting time",
  "etime":"ending time",
  "attendees":{
    "email":"attendee 1",
    "email":"attendee 2"
  },
  "token":"generated token by going to /url" 
}
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@SahilKr24](https://github.com/Sahilkr24)
- [@RKRohk](https://github.com/Rkrohk)

See also the list of [contributors](https://github.com/SahilKr24/meet-api/contributors) who participated in this project.

