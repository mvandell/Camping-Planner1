import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';

import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useGetSingleMealQuery, useDeleteFoodMutation, usePostFoodMutation } from "../../redux/api";
import { usePatchMealMutation, usePatchMealFoodRemoveMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchFoodMutation, usePatchFoodCoolerToggleMutation } from "../../redux/api";

const MealPage = () => {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(null);

    const {data, error, isLoading} = useGetSingleMealQuery();
    //const [deleteFood] = useDeleteFoodMutation();
    const [postFood] = usePostFoodMutation();
    const [patchMeal] = usePatchMealMutation();
    const [removeFood] = usePatchMealFoodRemoveMutation();
    //const [patchFood] = usePatchFoodMutation();
    const [coolerToggle] = usePatchFoodCoolerToggleMutation();
    const [purchaseToggle] = usePatchFoodPurchaseToggleMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <div>
            <Stack direction="row">
                <Typography>
                    {data.name}
                </Typography>
                <Typography>
                    {data.course}
                </Typography>
                {data.day &&
                    <Typography>
                        Day: {data.day}
                    </Typography>
                }
            </Stack>
            <Typography>
                Ingredients:
            </Typography>
            {data.foods && data.foods.map((ingredient) => (
                <Card key={ingredient.id} sx={{ p: 1, m: 1 }}>
                    <Stack direction="row">
                        <Typography>
                            {ingredient.name}
                        </Typography>
                        <Checkbox 
                        defaultChecked={ingredient.cooler}
                        onChange={async () => {
                            console.log("toggle cooler");
                            const response = await coolerToggle({id: ingredient.id, cooler: !cooler});
                            console.log("cooler", response);
                            }}/>
                        <Typography>Cooler</Typography>
                        <Checkbox 
                                defaultChecked={ingredient.purchased}
                                onChange={async () => {
                                    console.log("toggle purchased");
                                    const response = await purchaseToggle({id: ingredient.id, purchased: !purchased});
                                    console.log("purchased", response);
                            }}/>
                            <Typography>Purchased</Typography>
                    </Stack>
                    <Typography>
                        {ingredient.user.username}
                    </Typography>
                </Card>
            ))}
        </div>
    )
}

export default MealPage