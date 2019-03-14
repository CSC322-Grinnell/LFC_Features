var fetch = require("node-fetch"); // or fetch() is native in browsers
fetch("https://www.googleapis.com/calendar/v3/users/me/settings", {
  method: "get",
  headers: {
    Authorization: "Bearer ACCESS_TOKEN"
  }
})
  .then(res => res.json())
  .then(json => console.log(json))