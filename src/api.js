import _ from 'lodash';

const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=2e4a5c8b4dfa51e69081934585a2257e';
const kelvinToD = kel => {
  return Math.round(kel - 273.15) + '  °C ';
}

const toTitleCase = str => {
  return str.replace(/\w\S*/g,
    (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default function(latitude, longitude) {
  const url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then( res => res.json())
    .then( resJson => {
      // const {name, main: {temp}, weather: [{description}]} = resJson
      return {
        city: resJson.name,
        temperature: kelvinToD(resJson.main.temp),
        description: toTitleCase(resJson.weather[0].description)
      }
    })
    .catch( error => {
      console.warn(error);
    })
}

// var rootUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=c93544479a4c4df4bfb5ca0da660e6eb`;
// var kelvinToD = function(kel) {
//   return Math.round(kel - 273.15) + ' °C '
// };
//
// module.exports = function(latitude, longitude) {
//   var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
//   // console.log(url);
//   return fetch(url)
//     .then(function(response){
//       // console.log(res)
//       return response.json();
//     })
//     .then(function(resJson){
//       console.log(resJson)
//       return {
//         city: resJson.name,
//         temperature: kelvinToD(resJson.main.temp),
//         description: resJson.weather[0].description
//       }
//     })
//     .catch((error) => {
//       console.warn(error);
//     })
// }
