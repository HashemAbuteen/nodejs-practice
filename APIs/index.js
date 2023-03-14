//using node-fetch

const fetch = require("node-fetch");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5b534f4e85msh24620f4667e21b7p1f57aejsn512e2c0f93b4",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};

fetch(
  "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5",
  options
)
  .then((response) => response.json())
  .then((response) => console.log("fetch : ", response))
  .catch((err) => console.error(err));

// using axios

const axios = require("axios");

const axiosOptions = {
  method: "GET",
  url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
  params: { lat: "35.5", lon: "-78.5" },
  headers: {
    "X-RapidAPI-Key": "5b534f4e85msh24620f4667e21b7p1f57aejsn512e2c0f93b4",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};

axios
  .request(axiosOptions)
  .then(function (response) {
    console.log("axios : ", response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

// using request

const request = require("request");

const requestOptions = {
  method: "GET",
  url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly",
  qs: { lat: "35.5", lon: "-78.5" },
  headers: {
    "X-RapidAPI-Key": "5b534f4e85msh24620f4667e21b7p1f57aejsn512e2c0f93b4",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    useQueryString: true,
  },
};

request(requestOptions, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("request : ", JSON.parse(body));
});
