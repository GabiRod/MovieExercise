
var movies = [{
  "title": "Avatar",
  "year": 2009,
  "youtubeId": "6ziBFh3V1aM"
},
{
  "title": "Alien",
  "year": 1979,
  "youtubeId": "LjLamj-b0I8"
},
{
  "title": "Arrival",
  "year": 2016,
  "youtubeId": "tFMo3UJ4B4g"
},
{
  "title": "2001: A Space Odyssey",
  "year": 1968,
  "youtubeId": "oR_e9y-bka0"
},
{
  "title": "Terminator: 2",
  "year": 1991,
  "youtubeId": "lwSysg9o7wE"
},
{
  "title": "Blade Runner",
  "year": 1982,
  "youtubeId": "eogpIG53Cis"
}
];

//window.onload = function () {
// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: movieId
  });
}

// declare the variables of the movie 
let movieId;
let movieName;
let movieYear;

// loop through the movies JSON
for (i = 0; i < movies.length; i++) {
  if (document.getElementById("title").innerHTML == movies[i].title) {
    movieId = movies[i].youtubeId;
    movieName = movies[i].title;
    movieYear = movies[i].year;

    //Fetch the movie by filtering using movieName and movieYear
    fetch("https://www.omdbapi.com/?t=" + movieName + "&y=" + movieYear + "&apikey=da942d52")
      .then(response => response.json())
      .then(data => {

        //calculate the years since the release
        let currentYear = new Date();
        let currentMovieYear = new Date(data.Released);
        let differenceYear = Math.floor((currentYear.getTime() - currentMovieYear.getTime()) / (1000 * 3600 * 24 * 365));

        // append the data to the DOM
        document.getElementById("movieReleased").innerHTML = data.Released;
        document.getElementById("yearCalc").innerHTML = "(" + differenceYear + " years since movie originally released)";
        document.getElementById("movieDirector").innerHTML = data.Director;
        document.getElementById("movieWriter").innerHTML = data.Writer;
        document.getElementById("movieActor").innerHTML = data.Actors;
        document.getElementById("movieGenre").innerHTML = data.Genre;
        document.getElementById("movieDescription").innerHTML = data.Plot;
        let ratingList = document.getElementById("ratingList");

        //display the ratings
        data.Ratings.forEach(rating => {
          let ratingItem = document.createElement('p');
          ratingItem.appendChild(document.createElement('strong')).textContent = rating.Source;
          ratingItem.append(" " + rating.Value);

          ratingList.appendChild(ratingItem);
        });
      });

  }
}
