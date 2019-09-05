require('dotenv').config(); // https://www.npmjs.com/package/dotenv adds the .env files to your computer's env vars
const { REACT_APP_ACCESS_TOKEN, REACT_APP_API_URL } = process.env;

function postData(url = '', data) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
    },
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(response => response.json()); // parses JSON response into native JavaScript objects
}

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const fetchJson = url =>
  fetch(url, {
    headers: { Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}` },
  }).then(res => res.json());

// Routes

// GET: receive request, return response

app.get('/components', function(req, resp) {
  fetchJson(`${REACT_APP_API_URL}/components`).then(data => {
    return resp.send(data);
  });
});

app.get('/states', function(req, resp) {
  fetchJson(`${REACT_APP_API_URL}/states`).then(data => {
    return resp.send(data);
  });
});

app.get('/config', function(req, resp) {
  fetchJson(`${REACT_APP_API_URL}/config`).then(data => {
    return resp.send(data);
  });
});

app.post('/states/light.living_room_a', function(req, resp, next) {
  resp.send({ state: 'on' });
});

// TODO: request body is empty!!!!!!????
app.post('/lights', function(req, resp, next) {
  console.log('⚡🚨: req', req.body);

  postData(`${REACT_APP_API_URL}/states/light.living_room_a`, {
    state: 'on',
  })
    .then(data => {
      console.log('⚡🚨: data', data);
      resp.send('heya');
      // ...
    })
    .catch(err => {
      console.error(err);
      // res.redirect("/")?
    });
  switch (req.body.state) {
    case 'on':
      break;

    default:
      break;
  }
  // resp.send(req.body);
});

// https://stackoverflow.com/questions/32327858/how-to-send-a-post-request-from-node-js-express

// TODO: send this payload here: ({state: "play"});
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// fetch(url, {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'cors', // no-cors, cors, *same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//     'Content-Type': 'application/json',
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrer: 'no-referrer', // no-referrer, *client
//   body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
app.post('/states/media_player.living_room', function(req, resp, next) {
  // const { newIsOn } = req.body;

  //   fetchJson(`${REACT_APP_API_URL}/states`).then(data => {
  //     // const isOn = data.something
  //     // if (newIsOn !== isOn) {
  //     // do setNewIsOn
  //     // }
  //     // send "success? or new state"
  //    return resp.send({mediaPlayer: {isOn: newIsOn}})
  return resp.send('POSTED TO MEDIA PLAYER');
  //     console.log('⚡🚨: Object.entries(data)', Object.entries(data));
  //   });
});
// Sublime Text Keymap and Settings Importer https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings

//192.168.1.149:8123/api/states

// https: // url: http://localhost:8123/api/states/light.study_light
// method: POST
// headers:
//   authorization: 'Bearer ABCDEFGH'
//   content-type: 'application/json'
// payload: '{"state":"on"}'

//https://developers.home-assistant.io/docs/en/external_api_rest.html

app.listen(8080);
