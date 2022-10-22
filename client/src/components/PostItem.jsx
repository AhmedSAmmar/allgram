import React from "react";
import { useDispatch } from "react-redux";
import { removePost } from "../features/postsSlice";
import Edit from "./Edit";

// Material UI

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Box,
  Typography,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

//

// Create Component
function PostItem({ post }) {
  const dispatch = useDispatch();
  // JSX
  console.log(post);
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "90%",
          pt: "20px",
          mx: "auto",
          my: "auto",
        }}
        image={post.imageSrc}
        alt="post-image"
      />

      <CardContent sx={{ justifyContent: "center", alignContent: "flex-end" }}>
        <Box
          sx={{
            display: "inline-flex",
          }}
        >
          <Typography color="#533E85" fontSize="1rem" align="center">
            {post.caption}
          </Typography>
        </Box>
      </CardContent>

      <Stack
        sx={{ mb: "10px" }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        {/* <Edit ad={props} id={props.id} />
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {
            dispatch(removePost(props.id));
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button> */}
      </Stack>
    </Card>
  );
}

export default PostItem;
