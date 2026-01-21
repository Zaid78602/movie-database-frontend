import api from '../lib/axios';
import { Movie, MoviesResponse } from '../types/movie';

export const movieService = {
    getMovies: async (page: number = 1, limit: number = 8): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>(`/movies?page=${page}&limit=${limit}`);
        return response.data;
    },

    getMovie: async (id: string): Promise<Movie> => {
        const response = await api.get<Movie>(`/movies/${id}`);
        return response.data;
    },

    createMovie: async (formData: FormData): Promise<Movie> => {
        const response = await api.post<Movie>('/movies', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateMovie: async (id: string, formData: FormData): Promise<Movie> => {
        const response = await api.patch<Movie>(`/movies/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteMovie: async (id: string): Promise<void> => {
        await api.delete(`/movies/${id}`);
    },
};
