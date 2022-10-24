import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
// Redux
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Grid, Stack, Container, Box, LinearProgress } from "@mui/material";
import { getCurrentUserPosts } from "../api/posts";

// Create Component
function CurrentUserPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Redux
  const posts = useSelector((state) => state.currentUserPosts.value);
  const { user, token } = useSelector((state) => state.currentUser.value);

  useEffect(() => {
    if (user) {
      getCurrentUserPosts(setLoading, setError, token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // if (ads) {
  // JSX

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          width: "100%",
          bgcolor: "secondary.light",
          minHeight: "90vh",
          padding: "0",
        }}
      >
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <CreatePost />
        </Stack>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {posts.map((post, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <PostItem post={post} key={index} id={index} />
              </Grid>
            ))}
          </Grid>

          <Footer sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </div>
  );
}

export default CurrentUserPosts;
