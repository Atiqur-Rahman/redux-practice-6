import { getTags } from './tagsAPI';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: '',
};

export const fetchTagsAsync = createAsyncThunk('tags/fetchTags', async () => {
    const tags = await getTags();

    return tags;
});

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTagsAsync.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTagsAsync.fulfilled, (state, action) => {
                state.tags = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTagsAsync.rejected, (state, action) => {
                state.tags = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default tagsSlice.reducer;
