export default function fetchCountries(country) {
    return fetch(`https://restcountries.com/v2/name/${country}?fields=name,capital,flags,languages,population`)
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }
            return response.json();
        })
};

