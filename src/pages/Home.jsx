import React, { useEffect } from "react";
import { Tabs, Tab, Grid } from "@mui/material";
import Post from "../components/Post/post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { changeSorting, fetchPopularTags, fetchPosts, fetchTags } from "../redux/slices/posts";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const sorting = useSelector((state) => state.posts.sorting);
  const comments = useSelector((state) => state.comments);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts(sorting));
    dispatch(fetchTags());
    dispatch(fetchPopularTags());
  }, [dispatch, sorting]);

  const handleSortChange = (newValue) => {
    dispatch(changeSorting(newValue));
    dispatch(fetchPosts(newValue));
    console.log("Clicked on tab with value:", newValue);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sorting}
        onChange={(newValue) => handleSortChange(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label="New" value="new" onClick={() => handleSortChange("new")} />
        <Tab label="Popular" value="popular" onClick={() => handleSortChange("popular")} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={isTagsLoading} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tags.status === "loading"} />
          {/* <CommentsBlock
            items={comments} user={userData.user} 
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
