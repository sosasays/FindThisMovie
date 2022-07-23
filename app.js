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
