import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import movieReducer from './features/movieSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            movie: movieReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
