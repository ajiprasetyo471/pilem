// const srcBtn = document.querySelector(".search-button");
// srcBtn.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-keyword");
//   fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=${inputKey.value}`
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {
//       const movies = responseJson.results;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       const modalDetailBtn = document.querySelectorAll(".modal-detail-button");
//       modalDetailBtn.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const id = this.dataset.id;
//           fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=9b6e8f341d58e7535341bb35b8fac16f`
//           )
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

const searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", async function () {
  const inputKey = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKey.value);
  updateView(movies);
});

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const id = e.target.dataset.id;
    const movieDetail = await getMovieDetails(id);
    updateViewDetail(movieDetail);
  }
});

const getMovies = (key) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=${key}`
  )
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
};

const getMovieDetails = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=9b6e8f341d58e7535341bb35b8fac16f`
  )
    .then((response) => response.json())
    .then((m) => m);
};

const updateView = (movies) => {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
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
                <h6 class="card-subtitle mb-2 text-muted">${m.release_date}</h6>
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
