import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3'

const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

// const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDU3YTYzM2Y5ZmE1Mjk4OGEwZDBlYzEwOTkyNzE5NCIsInN1YiI6IjY0ODFkNmJjYmYzMWYyMDEzYWRjZmQxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gmuL87ypeXZEn7_01TyYqiHSSGyLN2A3YPHXErDW1V0';

const headers = {
    Authorization: 'bearer ' + TMDB_TOKEN
};

export const fetchDataFromAPI = async (url, params) => {
    try {
        const {data} =  await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (err) {
        console.log('error occured ', err);
        return err;
    }
}