
export function mapMovies (data) {
    const movie = []
    const results = data.results.slice(0, 5)
    for (let result of results) {
        movie.push({
            title: result.title,
            rating: result.vote_average,
            date: result.release_date,
            language: result.original_language,
            image: result.backdrop_path
        })
    }
    return movie
}