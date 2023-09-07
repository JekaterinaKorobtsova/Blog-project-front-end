import { Card, CardContent, Container, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchPostByTag } from '../redux/slices/posts';

import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    width: '80%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  });

export const Tag = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    const { tag } = useParams();

    useEffect(() => {
        console.log('Fetching posts for tag:', tag);
        dispatch(fetchPostByTag(tag));
    }, [dispatch, tag]);

    const filteredPosts = posts.items.filter(post =>
        post.tags.includes(tag)
      );


      return (
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Posts with Tag: {tag}
          </Typography>
          {filteredPosts.length === 0 ? (
            <Typography variant="body1">No posts found for this tag.</Typography>
          ) : (
            <List>
              {filteredPosts.map(post => (
                <ListItem key={post._id} disableGutters>
                  <StyledCard elevation={0} variant="outlined">
                    <CardContent>
                      <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" component="div">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.text}
                        </Typography>
                      </Link>
                    </CardContent>
                  </StyledCard>
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      );
    };