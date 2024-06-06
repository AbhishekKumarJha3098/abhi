// src/Home.js
import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GarudaLogo from './abhi.png'; // Add your Garuda logo image in the src folder

const theme = createTheme();

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setUploadedFile(selectedFile);
      setSelectedFile(null);
      window.alert('File uploaded successfully!');
    } else {
      window.alert('Please select a file to upload.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="Garuda Logo"
              src={GarudaLogo}
              sx={{ width: 150, height: 150, marginBottom: 2 }}
            />
            <Typography component="h1" variant="h5">
              Welcome to the Home Page
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Please upload your file below:
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ marginBottom: 2 }}
            >
              Select File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              disabled={!selectedFile}
            >
              Upload File
            </Button>
            {uploadedFile && (
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Uploaded file: {uploadedFile.name}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
