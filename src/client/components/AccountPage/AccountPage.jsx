import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetUserQuery, usePatchFoodCoolerToggleMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchClothingPackToggleMutation, usePatchClothingMutation } from "../../redux/api";

const AccountPage = () => {
    const [data, error, isLoading] = useGetUserQuery();
    const [coolerToggle] = usePatchFoodCoolerToggleMutation();
    const [purchaseToggle] = usePatchFoodPurchaseToggleMutation();
    const [packToggle] = usePatchClothingPackToggleMutation();
    //const [patchClothing] = usePatchClothingMutation();

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
            <Grid container>
                <Grid item >
                    <button>Edit Account</button> {/* open at bottom of section? */}
                    <button>Current Trip</button> {/* sort all trips or new GET current trip id? */}
                </Grid>
                <Grid item >
                    <Typography variant="h3">
                        Food
                    </Typography>
                    {data.foods && data.foods.map((food) => (
                        <Card key={food.id} sx={{ p: 1, m: 1 }}>
                            <Stack direction="row">
                                <Typography>
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
                <Grid item >
                    <Typography variant="h3">
                        Clothing
                    </Typography>
                    {data.clothing && data.clothing.map((clothing) => (
                        <Card key={clothing.id} sx={{ p: 1, m: 1 }}>
                            <Typography>
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
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default AccountPage