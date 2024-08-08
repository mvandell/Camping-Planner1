import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatchUserMutation } from "../../redux/api";

const EditUser = () => {
    const [patchUser, { error, isLoading }] = usePatchUserMutation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [secondPassword, setSecondPassword] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchUser({ username, password })
            console.log(response)
            navigate("/account")
        }
        catch (error) {
            console.error(error)
        }
    }
//TODO: button colors
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                    <Typography variant="h2" sx={{color: "bisque"}}>
                        Update Your Account:
                    </Typography>
                <Card sx={{m: 2, p: 3}}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="column">
                            <TextField
                                label="Update Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                size="small"
                                variant="filled"
                                sx={{ m: 1 }}
                            />
                            <TextField
                                label="Update Password"
                                value={password}
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                size="small"
                                variant="filled"
                                sx={{ m: 1 }}
                                helperText={
                                    password && password.length < 8
                                        ? <Alert severity="error"> Your password needs to be at least 8 characters long </Alert>
                                        : null
                                }
                            />
                            <TextField
                                label="Re-enter updated Password"
                                value={secondPassword}
                                type="password"
                                onChange={(event) => setSecondPassword(event.target.value)}
                                size="small"
                                variant="filled"
                                sx={{ m: 1 }}
                                error={
                                    !!(password && secondPassword !== secondPassword)
                                }
                                helperText={
                                    password && secondPassword && password !== secondPassword ?
                                        <Alert severity="error"> Passwords do not match </Alert> : null
                                }
                            />
                            <Typography textAlign="center" sx={{ m: 1 }}>
                                <Button type="submit" variant="contained" sx={{textTransform: "none"}}>
                                    Update
                                </Button>
                            </Typography>
                            <Typography textAlign="center" sx={{m: 1}}>
                                <Button onClick={() => navigate("/account")} variant="contained" sx={{textTransform: "none"}}>
                                    Cancel
                                </Button>
                            </Typography>
                        </Stack>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    )
}
export default EditUser;