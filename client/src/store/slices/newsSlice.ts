import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface NewsState {
    newsList: any[];
    pagination: {
        totalPages: number;
        currentPage: number;
    };
    loading: boolean;
    error: string | null;
}

export const fetchNews = createAsyncThunk('news/fetchAll', async (params: any = {}) => {
    const response = await api.get('/news', { params });
    return response.data;
});

const initialState: NewsState = {
    newsList: [],
    pagination: { totalPages: 1, currentPage: 1 },
    loading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.newsList = action.payload.news;
                state.pagination = {
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage,
                };
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            });
    },
});

export default newsSlice.reducer;
