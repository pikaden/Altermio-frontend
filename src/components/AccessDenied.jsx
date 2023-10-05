import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function AccessDenied() {
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
          <Typography component="h1" variant="h5">
            403
          </Typography>
          <Typography component="h1" variant="h5">
            ACCESS DENIED
          </Typography>
          <DangerousIcon
            sx={{ width: 200, height: 200 }}
            cols={1}
            gap={1}
            rowHeight={100}
          />
          <Typography variant="h5">
            YOU DON'T HAVE PERMISSION TO VIEW THIS PAGE
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: "#ff9c00" }}
          >
            Back to Home page
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
