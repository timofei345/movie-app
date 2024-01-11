import axios from "axios"
import { API_ROUTES } from "./API_routes"

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';

export const getPopular = async () => (
    await axios.get(API_ROUTES.popular, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTJkNjViNGQyZDEwZTgxMWJjM2I0MzNmYjg0YmU2ZSIsInN1YiI6IjY1N2EwNjE0ZWEzOTQ5MDEzODk4MTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95vGDo8a4IPhGsSs7B443KK2kN2NPgVbx8YPx3ikP9A'
        }
    }).then((res) => {
        return res.data.results
    })
)

export const getTop_rated = async () => (
    await axios.get(API_ROUTES.top_rated,
        {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTJkNjViNGQyZDEwZTgxMWJjM2I0MzNmYjg0YmU2ZSIsInN1YiI6IjY1N2EwNjE0ZWEzOTQ5MDEzODk4MTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95vGDo8a4IPhGsSs7B443KK2kN2NPgVbx8YPx3ikP9A'
            }
        }).then((res) => {
            return res.data.results
        })
)

export const getUpcoming = async () => (
    await axios.get(API_ROUTES.upcoming, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTJkNjViNGQyZDEwZTgxMWJjM2I0MzNmYjg0YmU2ZSIsInN1YiI6IjY1N2EwNjE0ZWEzOTQ5MDEzODk4MTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95vGDo8a4IPhGsSs7B443KK2kN2NPgVbx8YPx3ikP9A'
        }
    }).then((res) => {
        return res.data.results
    })
)

export const getMovie = async (id) => (
    await axios.get(`${id}`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTJkNjViNGQyZDEwZTgxMWJjM2I0MzNmYjg0YmU2ZSIsInN1YiI6IjY1N2EwNjE0ZWEzOTQ5MDEzODk4MTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95vGDo8a4IPhGsSs7B443KK2kN2NPgVbx8YPx3ikP9A'
        }
    }).then((res) => {
        return res.data
    })
)

export const getMovieMagnetLink = async (name) => {
    const options = {
        method: 'POST',
        url: 'https://piratebay-torrent-search.p.rapidapi.com/search',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '870012af52msh9abb62c599dda90p11aa85jsn26df9051a594',
            'X-RapidAPI-Host': 'piratebay-torrent-search.p.rapidapi.com'
        },
        data: {
            query: name,
            page: 1
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}