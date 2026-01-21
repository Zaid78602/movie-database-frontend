import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MoviesResponse } from '../../types/movie';
import { movieService } from '../../services/movieService';

interface MovieState {
    movies: Movie[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    currentMovie: Movie | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
    currentMovie: null,
    isLoading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk(
    'movie/fetchMovies',
    async ({ page, limit }: { page: number; limit: number }) => {
        return await movieService.getMovies(page, limit);
    }
);

export const deleteMovie = createAsyncThunk(
    'movie/deleteMovie',
    async (id: string, { dispatch }) => {
        await movieService.deleteMovie(id);
        return id;
    }
);

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setCurrentMovie: (state, action: PayloadAction<Movie | null>) => {
            state.currentMovie = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<MoviesResponse>) => {
                state.isLoading = false;
                state.movies = action.payload.data;
                state.total = action.payload.meta.total;
                state.page = action.payload.meta.page;
                state.limit = action.payload.meta.limit;
                state.totalPages = action.payload.meta.totalPages;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch movies';
            })
            .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
                state.movies = state.movies.filter((movie) => movie._id !== action.payload);
                state.total -= 1;
            });
    },
});

export const { setCurrentMovie, setPage, clearError } = movieSlice.actions;
export default movieSlice.reducer;
