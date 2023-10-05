import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function NotFound() {
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
            404
          </Typography>
          <Typography component="h1" variant="h5">
            Page Not Found
          </Typography>
          <SentimentVeryDissatisfiedIcon
            sx={{ width: 200, height: 200 }}
            cols={1}
            gap={1}
            rowHeight={100}
          />
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
