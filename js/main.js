$(document).ready(()=> {
  $("#searchForm").on('submit',(e)=>{
    e.preventDefault();
    let searchText=$("#searchtext").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" +searchText)

  /* Above code is used to fetch api and then it will return a promise
   i.e. the eventual result therfore we will use ".then" keyword
  */
  .then(function(response){
  //  console.log(response);
    let movies=response.data.results;
    let output="";
    $.each(movies,(index,movie)=>{
      output +=`

       <div class= "col-md-3 mx-auto my-auto mb-2">
       <div class="card  text-center text-white bg-dark">
         <img class="card-img-top " src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
          <div class="card-body ">
            <h4 class="card-title" >${movie.title}</h4>
            <a href="#" class="btn btn-primary " onclick="movieSelected('${movie.id}')">Details</a>
            </div>
          </div>
        </div>


      `;
    });

    $("#movies").html(output);
  })
      .catch(function(err){
        console.log(err);
      })
}

   function movieSelected(id) {
  sessionStorage.setItem("movieId",id);  //we pass data from one page to another is through local sessionStorage
  window.location="database.html";
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  // Make a request for a user with a given ID
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
    .then(function (response) {
    let movie = response.data;
    //console.log(movie);
      let output=`
             <div class="row">
                <div class="col-md-4">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top ">
                </div>
                <div class="col-md-8">
                 <h2>${movie.title}</h2>
                 <hr>
                 <ul class="list-group ">
                     <li class="list-group-item list-group-item-dark "><strong>Genre:</strong>${movie.genres[0].name}, ${movie.genres[1].name}</li>
                   <li class="list-group-item list-group-item-dark "><strong>Release Date:</strong>${movie.release_date}</li>
                   <li class="list-group-item list-group-item-dark "><strong>Vote:</strong>${movie.vote_average}</li>
                   <li class="list-group-item list-group-item-dark "><strong>Popularity :</strong>${movie.popularity}</li>
                   </ul>
                </div>
            </div>
            <div class="row">
              <div class="card-body">
                 <h3 class="card-title">Plot Summary</h3>
                 <p class="card-text"> ${movie.overview} </p>
                 <hr>
                 <a href="http://imdb.com/title/${movie.imdb_id}" class="btn btn-primary text-white" target="_blank">View Imdb</a>
                 <a href="project.html" class="btn btn-primary text-white">Home</a>
                 </div>
                 </div>
    `;
             $("#movie").html(output);

  })
      .catch(function(err){
        console.log(err);
      })
}
