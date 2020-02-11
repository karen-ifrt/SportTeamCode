
export function getTeamsFromApiWithSearchedText(text) {
    const url = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + text
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}