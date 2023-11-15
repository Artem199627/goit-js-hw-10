import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "./style.css";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
     select  : document.querySelector(".breed-select"),
     loader : document.querySelector(".loader"),
    div: document.querySelector(".cat-info"),
     error : document.querySelector(".error"),
};
const { select, loader, div, error } = ref;
select.classList.add('is-hidden');
error.classList.add("is-hidden");

select.addEventListener("change", onSelectBreed);

updateSelect();
function updateSelect(data) {
    fetchBreeds(data).then(data => {
        loader.classList.replace("loader", "is-hidden");
        let markup = data.map(({ name, id }) => {
            return `<option value ="${id}">${name}</option>`;
        });
        select.insertAdjacentHTML("beforeend", markup);
        new SlimSelect({
            select: select,
        });
    }).catch(onFetchError).finally(() => {
        loader.classList.replace("is-hidden", "loader");
        select.classList.replace("is-hidden", "is-visible");
    });
}

function onSelectBreed(evt) {
    loader.classList.replace("is-hidden", "loader");
    select.classList.add("is-hidden");
    div.classList.add("is-hidden");

    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId).then(data => {
        loader.classList.replace("loader", "is-hidden");
        select.classList.remove("is-hidden");
        const { url, breeds } = data[0];
        div.innerHTML = `<div class="box-image"><img src="${url}" alt="${breeds[0].name}" width="400"/>
      </div>
      <div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b>${breeds[0].temperament}</p></div>`;
        div.classList.remove("is-hidden");
    }).catch(onFetchError);
}
function onFetchError(error) {
    select.classList.remove("is-hidden");
    loader.classList.replace("loader", "is-hidden");
    div.style.display = "none";

    Notify.failure(
    
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '200px',
      fontSize: '20px',
    }
  );
}




