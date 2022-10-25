import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createPost, getPosts } from "../api/posts";
import { LinearProgress, Box } from "@mui/material";
import currentDate from "../date";

// Material UI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
//

// Create Component
function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = useSelector((state) => state.currentUser.value);

  const handleClick = () => {
    setLoading(true);
    uploadFiles(image);
  };

  const uploadFiles = (file) => {
    if (!file) {
      setError("Image required");
      setLoading(false);
      return;
    }

    const storageRef = ref(storage, `${user._id}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const date = currentDate();
        await createPost(
          user._id,
          user.fullname,
          downloadURL,
          caption,
          message,
          date,
          setLoading,
          setError,
          token
        );

        handleClose();
        setCaption("");
        setImage("");
        setMessage("");
      }
    );
  };

  // Events

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Create New Post <AddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <DialogTitle>Create New Post </DialogTitle>
        <DialogContent component="form">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Caption"
            name="caption"
            fullWidth
            variant="outlined"
            value={caption}
            onChange={(event) => {
              const value = event.target.value;
              setCaption(value);
            }}
          />
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            label="Meassage"
            name="message"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(event) => {
              const value = event.target.value;
              setMessage(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <h3>{error}</h3>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: "10px" }}
            onClick={handleClick}
            disabled={loading}
          >
            <AddIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePost;
