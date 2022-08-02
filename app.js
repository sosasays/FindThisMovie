// API token access from config.
const apiKey = config.MY_API_TOKEN;

// Access elements in the DOM.
const searchButton = document.querySelector('#search-button');
const results = document.querySelector('#results');
const grid = document.querySelector('.grid');

// Listen for the user to search with a query inputted.
searchButton.addEventListener('click', (e) => {
	// Prevent the form from refreshing the page.
	e.preventDefault();
	renderResults();
});

// Render the search grid of all results.
async function renderResults() {
	try {
		// Show the loading icon.
		toggleLoader(true);
		// Clear the results grid of movie art.
		results.innerHTML = '';
		// Search field submitted text.
		const searchQuery = document.querySelector('.search-text').value;
		// API request and populate the results grid of movie artwork.
		const movieData = await fetchMovies(searchQuery);
		renderMovies(movieData);
		// API request and populate the results grid of tv shows artwork.
		const tvShowsData = await fetchTvShows(searchQuery);
		renderTvShows(tvShowsData);
		// Sort the tv shows and movies by their popularity ranking stored on the HTML attribute data-popularity.
		sortResultsByPopularity();
	} catch (err) {
		console.log(err);
	} finally {
		// Remove the loading icon.
		toggleLoader(false);
		scrollToResults();
	}
}

// Toggle the loader icon displaying.
function toggleLoader(state) {
	if (state) {
		// Create a loader icon and append it after the search bar.
		const loader = document.createElement('div');
		loader.innerHTML = '<hr/><hr/><hr/><hr/>';
		loader.classList.add('load');
		grid.appendChild(loader);
	} else {
		// Select the loader icon and remove it.
		const loading = document.querySelector('.load');
		loading.remove();
	}
}

// Check the validity of a response and parse if it is ok.
async function checkStatusAndParse(response) {
	if (!response.ok) {
		throw new Error(`Status Code Error: ${response.status}`);
	}
	return await response.json();
}

// Fetch from the API all movies matching the search query.
async function fetchMovies(searchQuery) {
	try {
		const moviesResponse = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
		);
		const moviesData = await checkStatusAndParse(moviesResponse);
		return moviesData;
	} catch (err) {
		console.log(err);
	}
}

// Render the results grid with all matching movies from the search query.
async function renderMovies(movieData) {
	try {
		movieData.results.forEach(async (movie) => {
			renderArtwork(movie);
			renderDetails(movie, true, false);
			const streamingData = await fetchStreamingData(movie.id, true, false);
			renderStreamingData(streamingData, movie.id);
		});
	} catch (err) {
		console.log(err);
	}
}

// Fetch from the API all tv shows matching the search query.
async function fetchTvShows(searchQuery) {
	try {
		const showsResponse = await fetch(
			`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
		);
		const showsData = await checkStatusAndParse(showsResponse);
		return showsData;
	} catch (err) {
		console.log(err);
	}
}

// Render the results grid with all matching tv shows from the search query.
async function renderTvShows(showsData) {
	try {
		showsData.results.forEach(async (show) => {
			renderArtwork(show);
			renderDetails(show, false, true);
			const streamingData = await fetchStreamingData(show.id, false, true);
			renderStreamingData(streamingData, show.id);
		});
	} catch (err) {
		console.log(err);
	}
}

// Render the movie artwork into the results grid.
function renderArtwork(media) {
	if (media.id && media['poster_path']) {
		const artworkURL = `https://image.tmdb.org/t/p/w500/${media['poster_path']}`;

		// WHY DOES REPLACING THE BELOW WITH THE FOLLOWING INNERHTML NOT WORK FOR ADDING AN EVENT LISTENER?
		// const movieID = movie.id;
		// results.innerHTML += `<div class="card img-fluid col-xs-1 col-m-3 d-flex justify-content-center">
		//         <div id="${movieID}" class="card-front">
		//             <img class="movie-art img-fluid" src="${artworkURL}">
		//         </div>
		//     </div>`;

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
		cardDiv.setAttribute('data-popularity', media.popularity);

		// Create div for card-front with Bootstrap classes required for formatting and ID attribute.
		const cardFrontDiv = document.createElement('div');
		cardFrontDiv.classList.add('card-front');

		// Capture the unique movie ID from search and add to card-front.
		const id = `${media.id}`;
		cardFrontDiv.setAttribute('id', `${id}`);

		// Create img to be hold movie artwork in results grid.
		const imgArt = document.createElement('img');
		const imgClasses = [
			'movie-art',
			'img-fluid'
		];
		imgArt.classList.add(...imgClasses);
		imgArt.setAttribute('id', `${id}`);
		imgArt.setAttribute('src', artworkURL);

		// Create the card HTML element with all nested divs.
		results.appendChild(cardDiv);
		cardDiv.appendChild(cardFrontDiv);
		cardFrontDiv.appendChild(imgArt);

		// Listen for a click on the movie artwork and show the movie details when it occurs.
		const artCover = document.getElementById(id);
		artCover.addEventListener('click', (e) => {
			showDetails(e);
		});
	}
}

// Render the card containing all the movie or show details from the API request.
function renderDetails(media, isMovie, isShow) {
	let mediaName;
	let mediaDate;
	if (isMovie) {
		mediaName = 'title';
		mediaDate = 'release_date';
	}
	if (isShow) {
		mediaName = 'name';
		mediaDate = 'first_air_date';
	}
	if (media.id && media['poster_path']) {
		const cardInfo = document.createElement('div');
		cardInfo.innerHTML = `<div class="card-info col-xs-1 col-m-3" id="card${media.id}">
        <div class="card-format p-4">
            <div class="movie-title mb-3"><b>Title: </b><br>${media[mediaName]}</div>
            <div class="release-date mb-3"><b>Release Date: </b><br>${media[mediaDate]}</div>
            <div class="movie-info mb-3"><b>Description: </b><br>${media['overview']}</div>
            <div class="stream-on" id="stream${media.id}">
                <b>Watch Here</b>
                <ul class="subscription"><b>Steam On:</b></ul>
                <ul class="rent"><b>Rent On:</b></ul>
                <ul class="buy"><b>Buy On:</b></ul>
            </div>
        </div>
    </div>`;
		// Add the hidden movie details card after the relevant movie artwork card.
		const targetMedia = document.getElementById(media.id);
		targetMedia.after(cardInfo);
	}
}

// Fetch the list of watch providers where a movie is available to be streamed, rented, or bought.
async function fetchStreamingData(id, isMovie, isShow) {
	try {
		let streamingResponse;
		if (isMovie) {
			streamingResponse = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
			);
		}
		if (isShow) {
			streamingResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`);
		}
		const streamingData = await checkStatusAndParse(streamingResponse);
		return streamingData;
	} catch (err) {
		console.log(err);
	}
}

// Render the data of where a movie can be streamed to the movie details card.
function renderStreamingData(streamingData, id) {
	const streamOn = document.querySelector(`#stream${id}`);
	const subList = document.querySelector(`#stream${id} .subscription`);
	const rentList = document.querySelector(`#stream${id} .rent`);
	const buyList = document.querySelector(`#stream${id} .buy`);

	// Checking if any services are available in Canada.
	if (!streamingData.results['CA']) {
		streamOn.innerHTML = '<b>Not available to stream, rent, or buy in Canada.</b>';
	} else {
		// Checking if available with a subscription in Canada.
		if (streamingData.results['CA']['flatrate']) {
			// Loop through subscription providers in Canada.
			streamingData.results['CA']['flatrate'].forEach((provider) => {
				let li = document.createElement('li');
				subList.appendChild(li).innerHTML = provider['provider_name'];
			});
		} else {
			let li = document.createElement('li');
			subList.appendChild(li).innerHTML = 'Not available in Canada.';
		}
		// Checking if available for rent in Canada.
		if (streamingData.results['CA']['rent']) {
			// Loop through rent providers in Canada.
			streamingData.results['CA']['rent'].forEach((provider) => {
				let li = document.createElement('li');
				rentList.appendChild(li).innerHTML = provider['provider_name'];
			});
		} else {
			let li = document.createElement('li');
			rentList.appendChild(li).innerHTML = 'Not available in Canada.';
		}
		// Checking if available to buy in Canada.
		if (streamingData.results['CA']['buy']) {
			// Loop through buy providers in Canada.
			streamingData.results['CA']['buy'].forEach((provider) => {
				let li = document.createElement('li');
				buyList.appendChild(li).innerHTML = provider['provider_name'];
			});
		} else {
			let li = document.createElement('li');
			buyList.appendChild(li).innerHTML = 'Not available in Canada.';
		}
	}
}

// Show card of movie details and streaming availability in results grid after the movie artwork that is clicked.
function showDetails(e) {
	const targetMedia = document.getElementById(e.target.id);
	const infoCard = document.getElementById(`card${e.target.id}`);
	infoCard.style.display = infoCard.style.display == 'block' ? 'none' : 'block';
	targetMedia.after(infoCard);
}

// Display results grid and scroll to it.
function scrollToResults() {
	grid.style.display = 'flex';
	results.style.display = 'flex';
	window.scroll({
		top      : results.getBoundingClientRect().top,
		behavior : 'smooth'
	});
}

// Sort results given the assigned data-popularity HTML attribute.
function sortResultsByPopularity() {
	var mediaCard = document.querySelectorAll('.card');
	Array.from(mediaCard)
		.sort((a, b) => b.dataset.popularity - a.dataset.popularity)
		.forEach((el) => el.parentNode.appendChild(el));
}
