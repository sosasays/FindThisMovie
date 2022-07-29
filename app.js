// API token access from config.
const apiKey = config.MY_API_TOKEN;

// Access elements in the DOM.
const searchButton = document.querySelector('#search-button');
const results = document.querySelector('#results');
let searchQuery;
const movieTitle = document.querySelector('.movie-title');
const releaseDate = document.querySelector('.release-date');
const movieInfo = document.querySelector('.movie-info');
const streamOn = document.querySelector('.stream-on');
const subList = document.querySelector('.subscription');
const rentList = document.querySelector('.rent');
const buyList = document.querySelector('.buy');
const cardInfo = document.querySelector('.card-info');
const grid = document.querySelector('.grid');

// Add in auto-scroll to the movie film poster grid.
searchButton.addEventListener('click', (e) => {
	// Prevent the form from refreshing the page.
	e.preventDefault();
	renderResults();
});

function renderResults() {
	let loader = document.createElement('div');
	loader.innerHTML = '<hr/><hr/><hr/><hr/>';
	loader.classList.add('load');
	grid.appendChild(loader);
	try {
		// Clear the results grid of movie art.
		results.innerHTML = '';
		// Clear the movie info and additional details.
		clearCardInfo();
		getSearchResults();
		displayResults();
	} catch (err) {
		console.log(err);
	} finally {
		document.querySelector('.load').remove();
	}
}

// Display results grid and scroll to it.
function displayResults() {
	grid.style.display = 'flex';
	results.style.display = 'flex';
	window.scroll({
		top      : results.getBoundingClientRect().top,
		behavior : 'smooth'
	});
}

// Axios search query with user input.
function getSearchResults() {
	// Search field submitted text.
	searchQuery = document.querySelector('.search-text').value;

	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`)
		.then(checkStatusAndParse)
		.then(movieSearch)
		.catch((err) => console.log(err));
}

// Fetch status check and JSON parse.
function checkStatusAndParse(response) {
	if (!response.ok) {
		throw new Error(`Status Code Error: ${response.status}`);
	}
	return response.json();
}

// API search request for movie results grid.
function movieSearch(response) {
	response.results.forEach((movie, idx) => {
		if (movie.id && movie['poster_path']) {
			// Create div for card with Bootstrap classes required for formatting.
			const cardDiv = document.createElement('div');
			const cardClasses = [
				'card',
				'img-fluid',
				'col-xs-1',
				'col-m-3',
				'd-flex',
				'justify-content-center'
			];
			cardDiv.classList.add(...cardClasses);

			// Create div for card-front with Bootstrap classes required for formatting and ID attribute.
			const cardFrontDiv = document.createElement('div');
			cardFrontDiv.classList.add('card-front');

			// Capture the unique movie ID from search and add to card-front.
			const movieID = movie.id;
			cardFrontDiv.setAttribute('id', `${movieID}`);

			// Create img to be hold movie artwork in results grid.
			const imgArt = document.createElement('img');
			const imgClasses = [
				'movie-art',
				'img-fluid'
			];
			imgArt.classList.add(...imgClasses);
			imgArt.setAttribute('id', `${movieID}`);
			imgArt.setAttribute('src', `https://image.tmdb.org/t/p/w500/${response.results[idx]['poster_path']}`);

			// Create the card HTML element with all nested divs.
			results.appendChild(cardDiv);
			cardDiv.appendChild(cardFrontDiv);
			cardFrontDiv.appendChild(imgArt);

			// Show movie details once movie art is clicked.
			const movieCover = document.getElementById(movieID);
			movieCover.addEventListener('click', (e) => {
				clearCardInfo();
				getMovieDetails(movieID);
				showCardInfo(e);
			});
		}
	});
}

// Given the unique movieID search for and return the remaining details.
function getMovieDetails(movieID) {
	fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
		.then(checkStatusAndParse)
		.then((response) => {
			const originalTitle = response['title'];
			const date = response['release_date'];
			const overview = response['overview'];

			// Show the details of a selected movie artwork.
			renderMovieDetails(originalTitle, overview, date);
			// Update where you can stream, rent, or buy the movie.
			getAvailableStreaming(movieID);
		})
		.catch((err) => console.log(err));
}

// Update movie card elements to include the selected movie artwork details.
function renderMovieDetails(originalTitle, overview, date) {
	// Update movie title.
	movieTitle.innerHTML = '<b>Title: </b><br>' + originalTitle;
	// // Update movie release date.
	releaseDate.innerHTML = '<b>Release Date: </b><br>' + `${date}`;
	// // Update movie description.
	movieInfo.innerHTML = '<b>Description: </b><br>' + overview;
}

// Search for and append the list of watch providers where a movie is available to be streamed, rented, or bought.
function getAvailableStreaming(movieID) {
	fetch(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${apiKey}`)
		.then(checkStatusAndParse)
		.then((response) => {
			// Checking if any services are available in Canada.
			if (!response.results['CA']) {
				let div = document.createElement('div');
				streamOn.innerHTML = '<br> <b>Not available to stream, rent, or buy in Canada.</b>';
			} else {
				// Checking if available with a subscription in Canada.
				if (response.results['CA']['flatrate']) {
					// Loop through subscription providers in Canada.
					response.results['CA']['flatrate'].forEach((provider) => {
						let li = document.createElement('li');
						subList.appendChild(li).innerHTML = provider['provider_name'];
					});
				} else {
					let li = document.createElement('li');
					subList.appendChild(li).innerHTML = 'Not available in Canada.';
				}
				// Checking if available for rent in Canada.
				if (response.results['CA']['rent']) {
					// Loop through rent providers in Canada.
					response.results['CA']['rent'].forEach((provider) => {
						let li = document.createElement('li');
						rentList.appendChild(li).innerHTML = provider['provider_name'];
					});
				} else {
					let li = document.createElement('li');
					rentList.appendChild(li).innerHTML = 'Not available in Canada.';
				}
				// Checking if available to buy in Canada.
				if (response.results['CA']['buy']) {
					// Loop through buy providers in Canada.
					response.results['CA']['buy'].forEach((provider) => {
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

// Clear the additional movie details card and available streaming services.
function clearCardInfo() {
	movieTitle.innerHTML = '';
	releaseDate.innerHTML = '';
	movieInfo.innerHTML = '';
	subList.innerHTML = '<b>With Subscription:</b>';
	rentList.innerHTML = '<b>Rent On:</b>';
	buyList.innerHTML = '<b>Buy On:</b>';
	streamOn.innerHTML = '<b>Watch Here</b>';
	streamOn.appendChild(subList);
	streamOn.appendChild(rentList);
	streamOn.appendChild(buyList);
}

// Show display card of movie details and streaming availability in results grid.
function showCardInfo(e) {
	const targetMovie = document.getElementById(e.target.id);
	cardInfo.style.display = cardInfo.style.display == 'block' ? 'none' : 'block';
	targetMovie.after(cardInfo);
}
