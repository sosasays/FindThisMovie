import * as theMovieDb from './themoviedb.js';

const apiKey = config.MY_API_TOKEN;

const searchButton = document.querySelector('#search-button');
const results = document.getElementById('results');

// Add in auto-scroll to the movie film poster grid.
searchButton.addEventListener('click', (e) => {
	e.preventDefault();
	displayResults();
});

// Display results grid and scroll to it.
function displayResults() {
	results.style.display = 'block';
	console.log('display change');
	window.scroll({
		top      : 1000,
		behavior : 'smooth'
	});
}

// JS Library Import Not Working

// function successCB(e) {
// 	console.log('success', e);
// }

// function errorCB(e) {
// 	console.log('fail', e);
// }

// theMovieDb.search.getMulti({ query: 'Game%20Of%20Thrones' }, successCB, errorCB);

// Axios search query test
axios
	.get(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
			'Pirates of the Carribbean'
		)}`
	)
	.then((response) => {
		console.log(response);
	})
	.catch((err) => console.log(err));
