import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import BackpackIcon from '@mui/icons-material/Backpack';
import Switch from '@mui/material/Switch';

import { useState } from "react";
import { useGetUserClothingQuery, usePatchClothingPackToggleMutation, useDeleteClothingMutation } from "../../../redux/api";

const MapUnpackedClothing = () => {
    const { data, error, isLoading } = useGetUserClothingQuery();
    const [packToggle] = usePatchClothingPackToggleMutation();
    const [deleteClothing] = useDeleteClothingMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <Box sx={{ height: "80vh", overflowY: "scroll" }}>
            {data && data.filter((clothing) => clothing.packed === false).map((clothing) => (
                <Card key={clothing.id} sx={{ p: 1, px: 2, m: 1, backgroundColor: "linen" }}>
                    <Stack direction="row">
                        <IconButton
                            color="error"
                            sx={{ pl: 0 }}
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this clothing?") === true) {
                                    deleteClothing(clothing.id)
                                }
                            }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ flexGrow: 1, py: 1 }}>
                            {clothing.name}
                        </Typography>
                        <Checkbox
                            defaultChecked={clothing.packed}
                            onChange={async () => {
                                console.log("toggle packed");
                                const response = await packToggle({ id: clothing.id, packed: !clothing.packed });
                                console.log(response);
                            }} />
                        <BackpackIcon fontSize="medium" sx={{ py: 1 }} />
                    </Stack>
                </Card>
            ))}
        </Box>
    )
}
export default MapUnpackedClothing;