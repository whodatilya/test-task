
export function mapMovies (data) {
    const movie = []
    for (let item of data.results) {
        movie.push({
            title: item.title,
            rating: item.vote_average,
            date: item.release_date,
            language: item.original_language
        })
    }
    return movie
}