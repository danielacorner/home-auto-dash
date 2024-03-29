import { REACT_APP_ACCESS_TOKEN } from 'react-native-dotenv';
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// TODO: request body is empty!!!!!!????
export function postData(url = '', data) {
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
