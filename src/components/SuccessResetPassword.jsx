import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ImageList, ImageListItem } from "@mui/material";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Your password is successfully changed
          </Typography>
            <ImageList
              sx={{ width: 200, height: 200 }}
              cols={1}
              gap={1}
              rowHeight={100}
            >
              <ImageListItem>
                <img
                  src={'https://media.discordapp.net/attachments/593774840381571078/1155352612707762277/submit-successfully.png'}
                  alt={"successfully"}
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: "#ff9c00" }}
          >
            Sign in
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
