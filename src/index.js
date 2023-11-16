import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const select = document.querySelector(".breed-select");
export const loader = document.querySelector(".loader");
 const div = document.querySelector(".cat-info");
 
fetchBreeds().then(breeds => {
    renderSelect(breeds);
    loader.classList.add('is-hidden');
    select.classList.remove('is-hidden');
})
        .catch(error => {
            select.classList.add('is-hidden');
            div.classList.add('is-hidden');
            loader.classList.add('is-hidden');
            Notify.failure('Oops! Something went wrong! Try reloading the page!');
            console.log(error);
        });
   
select.addEventListener("input", evt => {
    evt.preventDefault();
    div.classList.add("is-hidden");
    loader.classList.remove("is-hidden");
    const breedId = select.options[select.selectedIndex].value;
    fetchCatByBreed(breedId).then(cat => {
        renderCat(cat);
        loader.classList.add("is-hidden");
        div.classList.remove("is-hidden");
    }).catch(err => {
        div.classList.add('is-hidden');
        loader.classList.add('is-hidden');
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.log(err);
    });
});
function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  select.insertAdjacentHTML("beforeend", markup);
}

function renderData(cat) {
  const image = cat[0].url;
  const catTemperament = cat[0].breeds[0].temperament;
  const catName = cat[0].breeds[0].name;
  const catDescription = cat[0].breeds[0].description;
  return `
<div class="image-container">
  <img src="${image}" alt="${catName}" class="cat-image" />
</div>
<div class="cat-body">
  <h4 class="cat-name">${catName}</h4>
  <p>${catDescription}</p>
  <p class="cat-temperament"><span class="cat-temp-span">Temperament:</span> ${catTemperament}</p>
</div>`;
}
function renderCat(cat) {
  const markup = renderData(cat);
  div.innerHTML = markup;
}




