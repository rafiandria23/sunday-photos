import axios from 'axios';

export const fetchAllPhotos = async () => {
    const url = `https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true&order=latest`;
    return await axios.get(url);
}

fetchAllPhotos('react');
