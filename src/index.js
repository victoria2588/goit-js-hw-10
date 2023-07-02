import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const containerEl = document.querySelector('.cat-info');

selectEl.addEventListener('change', onChange);

function onChange(event) {
  const breeds = event.target.value;

  loaderEl.hidden = false;
  selectEl.hidden = true;
  containerEl.hidden = true;

  fetchCatByBreed(breeds)
    .then(data => {
      if (!data.length) {
        Notiflix.Notify.failure(
          'Something went wrong! Try reloading the page!'
        );
      }

      containerEl.innerHTML = createMarkup(data);
    })

    .catch(error => {
      Notiflix.Notify.failure('Something went wrong! Try reloading the page!');
    });

  loaderEl.hidden = true;
  selectEl.hidden = false;
  containerEl.hidden = false;
}

function selectBreeds() {
  selectEl.hidden = true;
  fetchBreeds()
    .then(data => {
      selectEl.innerHTML = data
        .map(el => `<option value="${el.id}">${el.name}</option>`)
        .join('');
      new SlimSelect({
        select: '#selectCat',
        settings: {
          placeholderText: 'Select Cat',
        },
      });
    })
    .catch(error => {
      Notiflix.Notify.failure('Something went wrong! Try reloading the page!');
    });

  errorEl.hidden = true;
  loaderEl.hidden = true;
  selectEl.hidden = false;
}

selectBreeds();

function createMarkup(array) {
  return array
    .map(({ url, breeds: [{ description, name, temperament }] }) => {
      return `<img class="image" src="${url}" alt="${name}" width="400"/> 
    <h2 class="title">${name}</h2> 
    <p class="descr">${description}</p> 
    <h3 class="sub-title">Temperament</h3> 
    <p class="temperament">${temperament}</p>`;
    })
    .join('');
}
