class MarvelService {

    static API_KEY = '2a18360a8c31c765a4152e81f54bdfdc'
    static BASE_URL = 'https://gateway.marvel.com:443/v1/public/'

   static getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = () => {
        return MarvelService.getResource(`${MarvelService.BASE_URL}characters?limit=9&offset=210&apikey=${MarvelService.API_KEY}`)
    }

    getCharacter = (id) => {
        return MarvelService.getResource(`${MarvelService.BASE_URL}characters/${id}?apikey=${MarvelService.API_KEY}`)
    }
}

export default MarvelService