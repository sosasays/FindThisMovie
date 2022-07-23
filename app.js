// Add in auto-scroll to the movie film poster grid.
const search = document.querySelector('.search-btn');
search.addEventListener(
	'click',
	window.scroll({
		top      : 1000,
		behavior : 'smooth'
	})
);
