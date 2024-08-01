import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import { useState } from "react";
import { useSelector } from "react-redux";

import { useGetAllEquipmentQuery, useDeleteEquipmentMutation, usePostEquipmentMutation, useGetAdminQuery } from "../../redux/api";
import { usePatchEquipmentMutation, usePatchEquipmentPackToggleMutation, usePatchEquipmentNeedToggleMutation } from "../../redux/api";

const EquipmentPage = () => {
    const token = useSelector((state) => state.auth.token)

    const [name, setName] = useState("");

    const { data, error, isLoading } = useGetAllEquipmentQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteEquipment] = useDeleteEquipmentMutation();
    //const [patchEquipment] = usePatchEquipmentMutation();
    const [packToggle] = usePatchEquipmentPackToggleMutation();
    //const [needToggle] = usePatchEquipmentNeedToggleMutation();
    const [postEquipment] = usePostEquipmentMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
console.log(adminData)
    return (
        <div>
            <Typography variant="h1">
                Equipment
            </Typography>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} sx={{ height: "85vh", overflowY: "scroll" }}>
                    {data && data.map((equipment) => (
                        //TODO: filter by packed status?
                        <Card key={equipment.id} sx={{ p: 1, m: 1, px: 2, backgroundColor: "linen" }}>
                            <Stack direction="row">
                                {token && adminData.isAdmin &&
                                    <IconButton
                                    color="error"
                                    sx={{pl: 0}}
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this equipment?") === true) {
                                            deleteEquipment(equipment.id)
                                        }
                                    }}>
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                }
                                <Typography sx={{ flexGrow: 1, py: 1 }}>
                                    {equipment.name}
                                </Typography>
                                {token &&
                                    <>
                                        <Checkbox
                                            defaultChecked={equipment.packed}
                                            onChange={async () => {
                                                console.log("toggle packed");
                                                const response = await packToggle({ id: equipment.id, packed: !packed });
                                                console.log(response);
                                            }} />
                                        <Typography sx={{ py: 1 }}>Packed</Typography>
                                    </>
                                }
                            </Stack>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>

        </div>
    )
}

export default EquipmentPage