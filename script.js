const searchURL = "https://developer.nps.gov/api/v1/parks"

const apiKey = "8mrx3XYhahZLQwvRLjjlSZpfC3bSTNB2yFpRXbt6"

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getParks(query, maxResults = 10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit: maxResults
  }

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error
        (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(`<li><h3>${responseJson.data[i].fullName}</h3> <p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a> </li>`)
  };
  $('#results').removeClass('hidden');
}
function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    const numberOfResults = $('#numberOfResults').val();
    getParks(searchTerm, numberOfResults);
  });
}

$(watchForm);