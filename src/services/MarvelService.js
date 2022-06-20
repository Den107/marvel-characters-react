import {useHttp} from "../hooks/http.hook";

const useMarvelService=()=> {
const {loading, request, error, clearError} = useHttp()

    const _API_KEY = '2a18360a8c31c765a4152e81f54bdfdc'
    const _BASE_URL = 'https://gateway.marvel.com:443/v1/public/'
    const _BASE_OFFSET = 210



   const getAllCharacters = async (offset = _BASE_OFFSET) => {
        const res = await request(`${_BASE_URL}characters?limit=9&offset=${offset}&apikey=${_API_KEY}`)
        return res.data.results.map(_transformCharacter)
    }

   const getCharacter = async (id) => {
        const res = await request(`${_BASE_URL}characters/${id}?apikey=${_API_KEY}`)
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = char => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || 'Description not found...',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return {loading, error, getCharacter, getAllCharacters, clearError}
}

export default useMarvelService