import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';
import Cookies from 'js-cookie';


interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            Cookies.set('token', token, { expires: 7, path: '/' }); // Set cookie for middleware
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            Cookies.remove('token', { path: '/' }); // Clear cookie on logout
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && user) {
                state.token = token;
                state.user = JSON.parse(user);
                state.isAuthenticated = true;
            } else {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                Cookies.remove('token', { path: '/' }); // Sync: Clear cookie if localStorage is empty
            }
            state.isInitialized = true;
        },
    },
});

export const { setCredentials, logout, setLoading, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
