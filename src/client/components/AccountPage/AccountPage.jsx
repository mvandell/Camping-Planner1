import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetUserQuery, usePatchFoodCoolerToggleMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchClothingPackToggleMutation, usePatchClothingMutation, useGetCurrentTripIdQuery } from "../../redux/api";

const AccountPage = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetUserQuery();
    const { data: tripData, error: tripError, isLoading: tripIsLoading } = useGetCurrentTripIdQuery();
    // const [coolerToggle] = usePatchFoodCoolerToggleMutation();
    // const [purchaseToggle] = usePatchFoodPurchaseToggleMutation();
    // const [packToggle] = usePatchClothingPackToggleMutation();
    //const [patchClothing] = usePatchClothingMutation();

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
                    <Stack direction="column">
                        <Button variant="contained" sx={{ textTransform: "none", m: 2 }}>{/* open at bottom of section? */}
                            Edit Account
                        </Button>
                        <Link to={`/trip/${tripData.id}`}>
                            <Button variant="contained" sx={{ textTransform: "none", m: 2, width: "88%" }}>
                                Current Trip
                            </Button>
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h3" sx={{ color: "bisque" }}>
                        Food
                    </Typography>
                    <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                        {data.foods && data.foods.map((food) => (
                            <Card key={food.id} sx={{ p: 1, px: 2, m: 1, backgroundColor: "linen" }}>
                                <Stack direction="row">
                                    <Typography sx={{ flexGrow: 1 }}>
                                        {food.name}
                                    </Typography>
                                    <Checkbox
                                        defaultChecked={food.cooler}
                                        onChange={async () => {
                                            console.log("toggle cooler");
                                            const response = await coolerToggle({ id: food.id, cooler: !cooler });
                                            console.log("cooler", response);
                                        }} />
                                    <Typography sx={{ py: 1, pr: 1 }}>Cooler</Typography>
                                    <Checkbox
                                        defaultChecked={food.purchased}
                                        onChange={async () => {
                                            console.log("toggle purchased");
                                            const response = await purchaseToggle({ id: food.id, purchased: !purchased });
                                            console.log("purchased", response);
                                        }} />
                                    <Typography sx={{ py: 1 }}>Purchased</Typography>
                                </Stack>
                            </Card>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={4}> {/* scrollable */}
                    <Typography variant="h3" sx={{ color: "bisque" }}>
                        Clothing
                    </Typography>
                    <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                        {data.clothing && data.clothing.map((clothing) => (
                            <Card key={clothing.id} sx={{ p: 1, px: 2, m: 1, backgroundColor: "linen" }}>
                                <Stack direction="row">
                                    <Typography sx={{ flexGrow: 1 }}>
                                        {clothing.name}
                                    </Typography>
                                    <Checkbox
                                        defaultChecked={clothing.packed}
                                        onChange={async () => {
                                            console.log("toggle packed");
                                            const response = await packToggle({ id: clothing.id, packed: !packed });
                                            console.log(response);
                                        }} />
                                    <Typography sx={{ py: 1 }}>Packed</Typography>
                                </Stack>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default AccountPage