import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery, useGetCurrentTripIdQuery } from "../../redux/api";

import NewClothing from "./NewClothing";
import FoodList from "./FoodList";
import ClothingList from "./ClothingList";

const AccountPage = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetUserQuery();
    const { data: tripData, error: tripError, isLoading: tripIsLoading } = useGetCurrentTripIdQuery();

    if (!token) {
        navigate("/");
    }
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Typography variant="h1">
                Welcome, {data.username}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Stack direction="column" sx={{ textAlign: "center" }}>
                        <Link to={"/account/edit"}>
                            <Button variant="contained" color="warning" sx={{ textTransform: "none", m: 2 }}>
                                Edit Account
                            </Button>
                        </Link>
                        {tripData &&
                            <Link to={`/trip/${tripData.id}`}>
                                <Button variant="contained" color="success" sx={{ textTransform: "none", m: 2 }}>
                                    Current Trip
                                </Button>
                            </Link>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <FoodList />
                </Grid>
                <Grid item xs={3}> {/* scrollable */}
                    <ClothingList />
                </Grid>
                <Grid item xs={3}>
                    <NewClothing />
                </Grid>
            </Grid>
        </div>
    )
}

export default AccountPage