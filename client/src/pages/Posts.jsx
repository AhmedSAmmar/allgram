import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
// Redux
import { useSelector } from "react-redux";

// Material UI
import { Grid, Stack, Container, Box, LinearProgress } from "@mui/material";
import { getPosts } from "../api/posts";

// Create Component
function Posts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Redux
  const posts = useSelector((state) => state.posts.value);
  const { user, token } = useSelector((state) => state.currentUser.value);
  const [postItemNo, setPostItemNo] = useState({ last: 9 });
  useEffect(() => {
    getPosts(setLoading, setError, token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts, postItemNo]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.scrollingElement.scrollHeight &&
      posts.length > postItemNo.last
    ) {
      setPostItemNo((prevValue) => {
        return {
          last: prevValue.last + 9,
        };
      });
    }
  };

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
            {posts.slice(0, postItemNo.last).map((post, index) => (
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

export default Posts;
