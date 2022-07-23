import * as theMovieDb from './themoviedb.js';

// API token access from config.
const apiKey = config.MY_API_TOKEN;

// Access elements in the DOM.
const searchButton = document.querySelector('#search-button');
const results = document.querySelector('#results');
let searchQuery;
const movieTitle = document.querySelector('.movie-title');
const releaseDate = document.querySelector('.release-date');
const movieInfo = document.querySelector('.movie-info');
const movieArt = document.querySelector('#movie-art');
const streamOn = document.querySelector('.stream-on');
const subList = document.querySelector('.subscription');
const rentList = document.querySelector('.rent');
const buyList = document.querySelector('.buy');

// Add in auto-scroll to the movie film poster grid.
searchButton.addEventListener('click', (e) => {
	clearPreviousSearch();
	getSearchResults();
	// Prevent the form from refreshing the page.
	e.preventDefault();
	displayResults();
});

// Display results grid and scroll to it.
function displayResults() {
	results.style.display = 'block';
	window.scroll({
		top      : 1000,
		behavior : 'smooth'
	});
}

// Axios search query with user input.
function getSearchResults() {
	// Search field submitted text.
	searchQuery = document.querySelector('.search-text').value;
	axios
		.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`)
		.then((response) => {
			// Capture the unique movie ID from search.
			const movieID = response.data.results[0].id;
			// Update movie poster art.
			movieArt.src = `https://image.tmdb.org/t/p/w500/` + response.data.results[0]['poster_path'];
			// Update movie title.
			movieTitle.innerHTML = '<b>Title: </b><br>' + response.data.results[0]['original_title'];
			// Update movie release date.
			releaseDate.innerHTML = '<b>Release Date: </b><br>' + response.data.results[0]['release_date'];
			// Update movie description.
			movieInfo.innerHTML = '<b>Description: </b><br>' + response.data.results[0]['overview'];
			availableStreaming(movieID);
		})
		.catch((err) => console.log(err));
}

// Search for and append the list of watch providers where a movie is available to be streamed, rented, or bought.
function availableStreaming(movieID) {
	axios
		.get(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${apiKey}`)
		.then((response) => {
			// Checking if any services are available in Canada.
			if (!response.data.results['CA']) {
				let div = document.createElement('div');
				streamOn.innerHTML = '<br> <b>Not available to stream, rent, or buy in Canada.</b>';
			} else {
				// Checking if available with a subscription in Canada.
				if (response.data.results['CA']['flatrate']) {
					// Loop through subscription providers in Canada.
					response.data.results['CA']['flatrate'].forEach((provider) => {
						let li = document.createElement('li');
						subList.appendChild(li).innerHTML = provider['provider_name'];
					});
				} else {
					let li = document.createElement('li');
					subList.appendChild(li).innerHTML = 'Not available in Canada.';
				}
				// Checking if available for rent in Canada.
				if (response.data.results['CA']['rent']) {
					// Loop through rent providers in Canada.
					response.data.results['CA']['rent'].forEach((provider) => {
						let li = document.createElement('li');
						rentList.appendChild(li).innerHTML = provider['provider_name'];
					});
				} else {
					let li = document.createElement('li');
					rentList.appendChild(li).innerHTML = 'Not available in Canada.';
				}
				// Checking if available to buy in Canada.
				if (response.data.results['CA']['buy']) {
					// Loop through buy providers in Canada.
					response.data.results['CA']['buy'].forEach((provider) => {
						let li = document.createElement('li');
						buyList.appendChild(li).innerHTML = provider['provider_name'];
					});
				} else {
					let li = document.createElement('li');
					buyList.appendChild(li).innerHTML = 'Not available in Canada.';
				}
			}
		})
		.catch((err) => console.log(err));
}

function clearPreviousSearch() {
	subList.innerHTML = '<b>With Subscription:</b>';
	rentList.innerHTML = '<b>Rent On:</b>';
	buyList.innerHTML = '<b>Buy On:</b>';
	streamOn.innerHTML = '<b>Watch Here</b>';
	streamOn.appendChild(subList);
	streamOn.appendChild(rentList);
	streamOn.appendChild(buyList);
}

// JS Library Import Not Working

// function successCB(e) {
// 	console.log('success', e);
// }

// function errorCB(e) {
// 	console.log('fail', e);
// }

// theMovieDb.search.getMulti({ query: 'Game%20Of%20Thrones' }, successCB, errorCB);
