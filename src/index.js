// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=" +
//       $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.results;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);

//       // ketika tombol detail di-klik
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "https://api.themoviedb.org/3/movie/" +
//             $(this).data("id") +
//             "?api_key=9b6e8f341d58e7535341bb35b8fac16f",
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

const srcBtn = document.querySelector(".search-button");
srcBtn.addEventListener("click", function () {
  const inputKey = document.querySelector(".input-keyword");
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=${inputKey.value}`
  )
    .then((response) => response.json())
    .then((responseJson) => {
      const movies = responseJson.results;
      let cards = "";
      movies.forEach((m) => (cards += showCards(m)));
      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      const modalDetailBtn = document.querySelectorAll(".modal-detail-button");
      modalDetailBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=9b6e8f341d58e7535341bb35b8fac16f`
          )
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showMovieDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

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
