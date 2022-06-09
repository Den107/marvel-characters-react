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

    getAllCharacters = async () => {
        const res = await MarvelService.getResource(`${MarvelService.BASE_URL}characters?limit=9&offset=210&apikey=${MarvelService.API_KEY}`)
        return res.data.results.map(MarvelService._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await MarvelService.getResource(`${MarvelService.BASE_URL}characters/${id}?apikey=${MarvelService.API_KEY}`)
        return MarvelService._transformCharacter(res.data.results[0])
    }

    static _transformCharacter = char => {
        return {
            name: char.name,
            description: char.description || 'Description not found...',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService