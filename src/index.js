const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", async function () {
  try {
    const inputKey = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKey.value);
    updateView(movies);
  } catch (error) {
    alert(error);
  }
});

const getMovies = (key) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=${key}`
  )
    .then((response) => {
      if (response.status == 401) {
        throw new Error("Invalid API key!");
      }
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.errors == "query must be provided") {
        throw new Error("Please enter movie title!");
      } else if (responseJson.results == 0) {
        throw new Error("Movie not found!");
      }
      return responseJson.results;
    });
};

const updateView = (movies) => {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
};

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const id = e.target.dataset.id;
    const movieDetail = await getMovieDetails(id);
    updateViewDetail(movieDetail);
  }
});

const getMovieDetails = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=9b6e8f341d58e7535341bb35b8fac16f`
  )
    .then((response) => response.json())
    .then((m) => m);
};

const updateViewDetail = (m) => {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
};

function showCards(m) {
  return `<div class="col-md-4 my-3 card-container">
            <div class="card">
              <img src="https://image.tmdb.org/t/p/original/${m.poster_path}" class=" card-img-top">
              <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <a href="#" class="btn btn-danger modal-detail-button"  data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${m.id}">Show Details</a>
              </div>
            </div>
          </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="https://image.tmdb.org/t/p/original/${
                  m.poster_path
                }" class="img-fluid" />
              </div>
              <div class="col-md">
                <li class="list-group-item">
                  <h4>${m.title}</h4>
                </li>
                <li class="list-group-item">
                  <strong>Release Date : </strong>${m.release_date}</li>
                <li class="list-group-item">
                  <strong>Genre : </strong>${m.genres.map((m) => m.name)}</li>
                <li class="list-group-item">
                  <strong>Country : </strong>${m.production_countries.map(
                    (m) => m.name
                  )}</li>
                <li class="list-group-item"><strong>Rating : </strong>${
                  m.vote_average
                }</li>
                <li class="list-group-item">
                  <strong>Runtime : </strong>${m.runtime} min</li>
                <li class="list-group-item">
                  <strong>Plot : </strong><br />${m.overview}</li>
              </div>
            </div>
          </div>`;
}
