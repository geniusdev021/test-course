/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
	if (response.status === 204 || response.status === 205) {
		return null;
	}
	return response.json();
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
	url,
	options,
) {
	const baseUrl = process.env.REACT_APP_API_URL || '';
	let fOptions = options;
	if (options) {
		fOptions = {
			...options,
			...{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...options.headers,
				},
			},
		};
	}

	const fetchResponse = await fetch(`${baseUrl + url}`, fOptions);
	const response = await parseJSON(fetchResponse);
	if (!fetchResponse.ok) {
		throw response;
	}

	return response;
}
