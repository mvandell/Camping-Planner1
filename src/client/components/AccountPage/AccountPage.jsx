import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetUserQuery, usePatchFoodCoolerToggleMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchClothingPackToggleMutation, usePatchClothingMutation, useGetCurrentTripIdQuery } from "../../redux/api";

const AccountPage = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetUserQuery();
    const {data: tripData, error: tripError, isLoading: tripIsLoading} = useGetCurrentTripIdQuery();
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
    //TODO: checkbox and label on same line - check mom's website
    return (
        <div>
            <Typography variant="h1">
                Welcome, {data.username}
            </Typography>
            <Grid container>
                <Grid item xs={2}>
                    <Button variant="contained" sx={{ textTransform: "none", ml: 2, mt: 1 }}>{/* open at bottom of section? */}
                        Edit Account
                    </Button> 
                    <Link to={`/trip/${tripData.id}`}>
                        <Button variant="contained" sx={{ textTransform: "none", ml: 2, mt: 1 }}>
                            Current Trip
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h3">
                        Food
                    </Typography>
                    {data.foods && data.foods.map((food) => (
                        <Card key={food.id} sx={{ p: 1, px: 2, m: 1 }}>
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
                                <Typography>Cooler</Typography>
                                <Checkbox
                                    defaultChecked={food.purchased}
                                    onChange={async () => {
                                        console.log("toggle purchased");
                                        const response = await purchaseToggle({ id: food.id, purchased: !purchased });
                                        console.log("purchased", response);
                                    }} />
                                <Typography>Purchased</Typography>
                            </Stack>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={4}> {/* scrollable */}
                    <Typography variant="h3">
                        Clothing
                    </Typography>
                    {data.clothing && data.clothing.map((clothing) => (
                        <Card key={clothing.id} sx={{ p: 1, px: 2, m: 1 }}>
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
                                <Typography>Packed</Typography>
                            </Stack>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default AccountPage