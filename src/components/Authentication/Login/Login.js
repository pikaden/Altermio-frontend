import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import userAtom from '../Atom/userAtom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        await axios.post(`http://localhost:3000/v1/auth/login/`, {
            email: data.get('email'),
            password: data.get('password'),
        })
            .then(res => {
                console.log(res);
                const accessToken = res.data.tokens.access;
                const refreshToken = res.data.tokens.refresh;
                const userRole = res.data.user.role;

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                
                setUser(res.data.user);

                if (userRole === 'admin') {
                    navigate('/admin');
                } else if (userRole === 'moderator') {
                    navigate('/moderator');
                } else if (userRole === 'user') {
                    navigate('/')
                } else if (userRole === 'courier') {
                    navigate('/courier');
                } else navigate('/')
            })
            .catch(err => {
                alert('Login failed');
            })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Grid textAlign={"left"}>
                                <FormControlLabel
                                    control={<Checkbox name='remember' value={1} color="primary" />}
                                    label="Remember me"

                                />
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={
                                    {
                                        backgroundColor: "#ff9c00",
                                        color: "#FFFFFF"
                                    }
                                }
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs textAlign={"left"} >
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}