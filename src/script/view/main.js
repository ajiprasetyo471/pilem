const inputKey = document.querySelector(".input-keyword");
const searchBtn = document.querySelector(".search-button");
const movieContainer = document.querySelector(".movie-container");

searchBtn.addEventListener("click", async function (ev) {
  ev.preventDefault();
  const movies = inputKey.value;
  if (movies) {
    searchMovies(movies);
  }
  reset();
});

document.addEventListener("click", async function (ev) {
  const {
    tagName,
    classList,
    id
  } = ev.target;
  if (tagName.toLowerCase() === "img") {
    const mId = ev.target.dataset.id;
    const movieDetail = await getMovieDetails(mId);
    updateViewDetail(movieDetail);
  }

  if (classList.contains("trailer-button")) {
    const movieId = ev.target.dataset.movieId;
    const movieItem =
      ev.target.parentElement.parentElement.parentElement.parentElement;
    const trailer = movieItem.nextElementSibling;
    trailer.classList.add("trailer-display");
    getVideos(movieId, trailer);
  }

  if (id === "trailer-close") {
    const trailer = ev.target.parentElement;
    trailer.classList.remove("trailer-display");
  }
});

const getError = (error) => {
  console.log(error.message);
  alert(error.message || 'Internal Server');
}

const reset = () => {
  inputKey.value = '';
  movieContainer.innerHTML = "";
}

function renderMovies(movie) {
  const movies = movie.results;
  const movieCollection = updateView(movies, this.title);
  movieContainer.appendChild(movieCollection);
};

const updateView = (movies, title = '') => {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  let cards = `
  <h2>${title}</h2>
  <section class="movie-item">
    ${movieSection(movies)}
  </section>
  <div class="trailer">
    <p id="trailer-close">X</p>
  </div>
  `;

  movieElement.innerHTML = cards;
  return movieElement;
};

const movieSection = (movies) => {
  return movies.map((m) => {
    if (m.poster_path) {
      return showCards(m);
    }
  });
};

const showCards = (m) => {
  return `<div class="card-container text-dark bg-light mb-3">
            <div class="card">
              <img src="${IMG_URL}${m.poster_path}" class=" card-img-top"  data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${m.id}">
              <div class="card-body">
                <h5 class="card-title">${m.title}</h5>
                <a href="#" class="btn btn-danger trailer-button" data-movie-id="${m.id}">Play Trailer</a>
              </div>
            </div>
          </div>`;
};

const updateViewDetail = (m) => {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
};

const showMovieDetail = (m) => {
  return `<div class="container-fluid text-light bg-dark">
            <div class="row">
              <div class="col-md-3">
                <img src="${IMG_URL}${m.poster_path}" class="img-fluid" />
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
};

const createVideoFrame = (video) => {
  const key = (video && video.key) || 'Key not found!';
  const videoFrame = document.createElement("iframe");
  videoFrame.src = `${VIDEO_URL}${key}`;
  videoFrame.width = 350;
  videoFrame.height = 300;
  videoFrame.allowFullscreen = true;
  return videoFrame;
};

function createVideoDetail(responseJson) {
  const trailer = this.trailer;
  trailer.innerHTML = '<p id="trailer-close">X</p>';
  const videos = responseJson.results || [];
  const length = videos.length > 3 ? 3 : videos.length;
  const videoFrameContainer = document.createElement('div');

  if (videos.length === 0) {
    trailer.innerHTML = `
    <p id="trailer-close">X</p>
    <p>There is no trailer found this video id: ${responseJson.id}</p>
    `;
    return;
  }

  for (let v = 0; v < length; v++) {
    const video = videos[v];
    const videoFrame = createVideoFrame(video);
    videoFrameContainer.appendChild(videoFrame);
    trailer.appendChild(videoFrameContainer);
  }
};

getNowPlayingMovies();
getTrendingMovies();
getPopularMovies();
getTopRatedMovies();