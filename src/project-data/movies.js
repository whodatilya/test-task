import axios from 'axios'
import { URL_FETCH_MOVIES } from "@/project-data/urls";
import { API_KEY } from "@/project-data/api";
import {mapMovies} from "@/project-data/mapper";

export default {
    async fetchMovies () {
        return await axios
            .get(`${URL_FETCH_MOVIES}?api_key=${API_KEY}`)
            .then(response => {
                return mapMovies(response.data)
            })
            .catch(error => {
                console.error('Error -> ', error)
            })
    },
}
