import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideos } from './videosAPI';

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: '',
};

export const fetchVideosAsync = createAsyncThunk('videos/fetchVideos', async () => {
    const videos = await getVideos();
    return videos;
});

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosAsync.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideosAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.videos = [];
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default videosSlice.reducer;
