import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchComments = createAsyncThunk("comments/fetchComments", async (postId) => {
    const { data } = await axios.get(`/posts/${postId}`);
    return data;
  });
  

const initialState = {
    items: [],
    status: "loading",
    text: "", 
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      console.log("addNewComment action:", action);
      state.items.push(action.payload);
      if (action.payload.post) {
        const postId = action.payload.post;
        const post = state.items.find((item) => item._id === postId);
        if (post) {
          post.commentsCount += 1; 
        }
      }
    },
      setCommentText: (state, action) => {
        state.text = action.payload;
      },
  },

  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.items = action.payload.comments;
      state.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { addNewComment, setCommentText } = commentsSlice.actions;
