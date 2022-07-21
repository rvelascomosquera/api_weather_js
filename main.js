const api = {
  key: '9e122cd782b2d0333f5fe4e7fa192062',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

const city = document.getElementById('card__city');
const date = document.getElementById('card__date');
const forecastIcon = document.getElementById('temp__icon');
const temp = document.getElementById('card__temp');
const weatherCondition = document.getElementById('card__description');
const range = document.getElementById('Range');
const form = document.getElementById('form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit', onSubmit, true);

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = '/imagen/soleado.jpg';
  if (temp > 26) {
    src = '/imagen/soleado.jpg';
  } else if (temp < 25 && temp > 15) {
    src = '/imagen/templado.png';
  } else if (temp < 14 ) {
    src = '/imagen/frio.jpg';
  } 
  forecastIcon.src = src;
}

const search = (query) => {
  return new Promise ((resolve, reject) => {
    axios.get(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
      .then((res) => {
        popularHtml(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const popularHtml = (data) => {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  date.innerHTML = (new Date()).toLocaleDateString();
  temp.innerHTML = `${toCelsius(data.main.temp)}ºC`;
  weatherCondition.innerHTML = data.weather[0].description;
  range.innerHTML = `${toCelsius(data.main.temp_min)} ºC / ${toCelsius(data.main.temp_max)} ºC`;
  updateImages(data);
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 274);
}

