import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetSingleMealQuery, useDeleteFoodMutation, usePostFoodMutation } from "../../redux/api";
import { usePatchMealMutation, usePatchMealFoodRemoveMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchFoodMutation, usePatchFoodCoolerToggleMutation } from "../../redux/api";
import MealPageBody from "./MealPageBody";
import NewFood from "./NewFood";

const MealPage = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token)
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);

    const { data, error, isLoading } = useGetSingleMealQuery(id);
    //const [postFood] = usePostFoodMutation();
    //const [patchMeal] = usePatchMealMutation();
    //const [patchFood] = usePatchFoodMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: post food?
    //TODO: patch meal?
    return (
        <div>
            <Stack direction="row">
                <Typography variant="h1" sx={{ m: 1 }}>
                    {data.name}
                </Typography>
            </Stack>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={5}>
                    <Typography variant="h3" sx={{ color: "bisque" }}>
                        Ingredients:
                    </Typography>
                    {data.foods && data.foods.map((ingredient) => (
                        <Card key={ingredient.id} sx={{ p: 1, m: 1, backgroundColor: "linen" }}>
                            <MealPageBody ingredient={ingredient} />
                            <Typography sx={{}}>
                                {ingredient.user.username}
                            </Typography>
                        </Card>
                    ))}
                    {token &&
                        <Card sx={{ backgroundColor: "linen", m: 1 }}>
                            <NewFood id={id} />
                        </Card>
                    }
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    )
}

export default MealPage