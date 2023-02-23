import api from '@/project-data'

export async function loadMovies ({ commit }) {
    const response = await api.movies.fetchMovies()
    commit('SAVE_MOVIES', response)
}