import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useGetUserFoodQuery, usePatchFoodCoolerToggleMutation, usePatchFoodPurchaseToggleMutation } from "../../redux/api";

const FoodList = () => {
    const { data, error, isLoading } = useGetUserFoodQuery();
    const [coolerToggle] = usePatchFoodCoolerToggleMutation();
    const [purchaseToggle] = usePatchFoodPurchaseToggleMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            <Typography variant="h3" sx={{ color: "bisque" }}>
                Food
            </Typography>
            <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                {data && data.map((food) => (
                    <Card key={food.id} sx={{ p: 1, px: 2, m: 1, backgroundColor: "linen" }}>
                        <Stack direction="row">
                            <Typography sx={{ flexGrow: 1, py: 1 }}>
                                {food.name}
                            </Typography>
                            <Checkbox
                                defaultChecked={food.cooler} //icon instead? snowflake? fridge?
                                onChange={async () => {
                                    console.log("toggle cooler");
                                    const response = await coolerToggle({ id: food.id, cooler: !cooler });
                                    console.log("cooler", response);
                                }} />
                            <KitchenIcon fontSize="medium" sx={{py: 1}}/>
                            <Checkbox
                                defaultChecked={food.purchased} //icon instead? store? storeFront? shoppingCart?
                                onChange={async () => {
                                    console.log("toggle purchased");
                                    const response = await purchaseToggle({ id: food.id, purchased: !purchased });
                                    console.log("purchased", response);
                                }} />
                            <ShoppingCartIcon fontSize="medium" sx={{py: 1}}/>
                        </Stack>
                    </Card>
                ))}
            </Box>
        </>
    )
}
export default FoodList;