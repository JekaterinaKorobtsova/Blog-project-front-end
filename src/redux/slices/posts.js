import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (sorting) => {
  const { data } = await axios.get(`/posts?sorting=${sorting}`);
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchPopularTags = createAsyncThunk("posts/fetchPopularTags", async () => {
  const { data } = await axios.get("/popular-tags");
  return data;
});

export const fetchPostByTag = createAsyncThunk("posts/fetchPostByTag", async (tag) => {
  const { data } = await axios.get(`/posts/tags/${tag}`);
  return data;
});

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) =>
  axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  sorting: "new",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },

  extraReducers: {
    // get posts
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // get tags
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // delete post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
    // popular tags
    [fetchPopularTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchPopularTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchPopularTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
export const { changeSorting } = postsSlice.actions;
