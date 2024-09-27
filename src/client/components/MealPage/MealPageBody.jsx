import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import KitchenIcon from '@mui/icons-material/Kitchen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';

import { useParams } from "react-router-dom";

import { useDeleteFoodMutation, usePostFoodMutation } from "../../redux/api";
import { usePatchMealMutation, usePatchMealFoodRemoveMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";
import { usePatchFoodMutation, usePatchFoodCoolerToggleMutation } from "../../redux/api";

const MealPageBody = ({ ingredient }) => {
    const { id } = useParams();

    const [deleteFood] = useDeleteFoodMutation();
    const [postFood] = usePostFoodMutation();
    const [patchMeal] = usePatchMealMutation();
    const [removeFood, { error, isLoading }] = usePatchMealFoodRemoveMutation();
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
        <Stack direction="row">
            <IconButton
                color="error"
                sx={{ pl: 0 }}
                onClick={() => {
                    if (confirm("Are you sure you want to delete this ingredient?") === true) {
                        deleteFood(ingredient.id)
                    }
                }}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
                onClick={() => {
                    if (confirm("Are you sure you want to remove this ingredient from this meal?") === true) {
                        removeFood({ id: id, name: ingredient.name })
                    }
                }}
                color="error"
                sx={{ textTransform: "none", m: 0, p: 0, mr: 1 }}>
                <ClearIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ flexGrow: 1, py: 1, fontWeight: "bold" }}>
                {ingredient.name}
            </Typography>
            <Checkbox
                defaultChecked={ingredient.cooler}
                onChange={async () => {
                    console.log("toggle cooler");
                    const response = await coolerToggle({ id: ingredient.id, cooler: !food.cooler });
                    console.log("cooler", response);
                }} />
            <KitchenIcon fontSize="medium" sx={{ py: 1 }} />
            <Checkbox
                defaultChecked={ingredient.purchased}
                onChange={async () => {
                    console.log("toggle purchased");
                    const response = await purchaseToggle({ id: ingredient.id, purchased: !food.purchased });
                    console.log("purchased", response);
                }} />
            <ShoppingCartIcon fontSize="medium" sx={{ py: 1 }} />
        </Stack>
    )
}
export default MealPageBody;