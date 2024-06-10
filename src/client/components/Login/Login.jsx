import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import { useLoginMutation, useGetAllUsersValidationQuery } from "../../redux/api";

const Login = () => {
    const {data, isLoading} = useGetAllUsersValidationQuery();
    const [login, { error }] = useLoginMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    if (error) {
        return <div>Whoops! Something went wrong logging you in.</div>
    }

    let validUser = false;

    const handleSubmit = async (event) => {
        try {
            if (validUser === true) {
                event.preventDefault();
                const result = await login({ username, password });
                console.log(result);
                navigate("/account")
            }
        } catch (error) {
            console.error(error)
        }
    }
    const validateUsername = (name) => {
        const compare = data.find((current) => { return current.username === name })
        if (compare === undefined) { validUser = false; return <Alert severity="error">Username not found.</Alert> }
        if (compare !== undefined) { validUser = true }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 5, backgroundColor: "white", maxWidth: 600, mt: 5 }}>
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                            Login:
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <TextField
                                    label="Enter Login Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    size="small"
                                    required
                                    variant="filled"
                                    sx={{ m: 1 }}
                                    helperText={username && validateUsername(username)}
                                />
                                <TextField
                                    label="Enter Password"
                                    value={password}
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    size="small"
                                    required
                                    variant="filled"
                                    sx={{ m: 1 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", p: 1, mx: 32 }}>
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;