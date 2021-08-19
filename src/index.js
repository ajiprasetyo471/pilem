$.ajax({
  url:
    "https://api.themoviedb.org/3/search/movie?api_key=9b6e8f341d58e7535341bb35b8fac16f&query=godfather",
  success: (results) => {
    const movies = results.results;
    console.log(movies);
    let cards = "";
    movies.forEach((m) => {
      cards += `<div class="col-md-4 my-3">
                  <div class="card"">
                    <img src="https://image.tmdb.org/t/p/original/${m.poster_path}" class=" card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${m.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${m.release_date}</h6>
                      <a href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#movieDetailModal">Show Details</a>
                    </div>
                  </div>
                </div>`;
    });
    $(".movie-container").html(cards);
  },
  error: (e) => {
    console.log(e.responseText);
  },
});
