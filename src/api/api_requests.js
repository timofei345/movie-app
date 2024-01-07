import axios from "axios"
import { API_ROUTES } from "./API_routes"

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTJkNjViNGQyZDEwZTgxMWJjM2I0MzNmYjg0YmU2ZSIsInN1YiI6IjY1N2EwNjE0ZWEzOTQ5MDEzODk4MTgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95vGDo8a4IPhGsSs7B443KK2kN2NPgVbx8YPx3ikP9A';

export const getPopular = async() => (
        await axios.get(API_ROUTES.popular).then((res)=>{
            return res.data.results
        })
)

export const getTop_rated = async() => (
        await axios.get(API_ROUTES.top_rated).then((res)=>{
            return res.data.results
        })
)

export const getUpcoming = async() => (
    await axios.get(API_ROUTES.upcoming).then((res)=>{
        return res.data.results
    })
)

export const getMovie = async(id) => (
    await axios.get(`${id}`).then((res) => {
        return res.data
    })
)

