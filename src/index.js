import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
const countryListEL = document.querySelector('.country-list');
const countryInfoEL = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

let country = null;

function onInputSearch(event){
    country = event.target.value;
    if (country.trim() === '') {
        countryListEL.innerHTML = '';
        countryInfoEL.innerHTML = '';   
           return };
    console.log(country);
    fetchCountries(country);
}

function fetchCountries() {
    return fetch(`https://restcountries.com/v2/name/${country}?fields=name,capital,flags,languages,population`)
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }
            return response.json();
        })
        .then(data => {
            filter(data)
        })
        .catch((data) => {
            Notiflix.Notify.failure("Oops, there is no country with that name")
        });
};

function filter(array) {
    if (array.length > 10) {
        return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name');
    } 
    if (array.length > 2 && array.length < 10) {
        const markap = array.map(info => 
                        `<li> 
                           <svg class="icon-flag" width="30" height="20" >
                            <image  href="${info.flags.svg}"></image>
                            </svg>
                            <span>${info.name}</span> 
                         </li>`
        ).join('');
        countryInfoEL.innerHTML = '';
       return countryListEL.innerHTML = markap;
    }
    if (array.length === 1) {
        const markap = array.map(info =>
            ` <div><svg class="icon-flag" width="60" height="40" >
                            <image  href="${info.flags.svg}"></image>
                            </svg>
                            <span class ="country">${info.name}</span> 
                          </div>  
                          <div>
                            <span class ="country-key">Capital: </span>
                            <class ="country-option"span>${info.capital}</span>
                          </div>
                          <div>
                            <span class ="country-key">Population: </span>
                            <class ="country-option"span>${info.population}</span>
                          </div>
                          <div>
                            <span class ="country-key">languages: </span>
                            <class ="country-option"span>${info.languages.map(language => language.name).join(', ')}</span>
                          </div>
                         `
        ).join('');
        countryListEL.innerHTML = '';
        console.log(countryInfoEL);
        return countryInfoEL.innerHTML = markap;
    }
}


           