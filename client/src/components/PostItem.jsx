import React from "react";
import { useDispatch } from "react-redux";
import { posts, removePost } from "../features/postsSlice";
import Edit from "./Edit";

// Material UI

import { Button, Stack, Box } from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Create Component
function PostItem({ post }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={post.fullname}
        subheader={post.date}
      />
      <CardMedia
        component="img"
        height="300"
        image={post.imageSrc}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {post.message && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{post.message}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

//   const dispatch = useDispatch();
//   // JSX
//   console.log(post);
//   return (
//     <Card
//       variant="outlined"
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <CardMedia
//         component="img"
//         sx={{
//           width: "90%",
//           pt: "20px",
//           mx: "auto",
//           my: "auto",
//         }}
//         image={post.imageSrc}
//         alt="post-image"
//       />

//       <CardContent sx={{ justifyContent: "center", alignContent: "flex-end" }}>
//         <Box
//           sx={{
//             display: "inline-flex",
//           }}
//         >
//           <Typography color="#533E85" fontSize="1rem" align="center">
//             {post.caption}
//           </Typography>
//         </Box>
//       </CardContent>

//       <Stack
//         sx={{ mb: "10px" }}
//         direction="row"
//         spacing={2}
//         justifyContent="center"
//       >
//         {/* <Edit ad={props} id={props.id} />
//         <Button
//           color="primary"
//           variant="outlined"
//           size="small"
//           onClick={() => {
//             dispatch(removePost(props.id));
//           }}
//           startIcon={<DeleteIcon />}
//         >
//           Delete
//         </Button> */}
//       </Stack>
//     </Card>
//   );
// }

export default PostItem;
