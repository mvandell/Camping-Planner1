import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import { useSelector } from "react-redux";

import { useGetAllEquipmentQuery, useDeleteEquipmentMutation, useGetAdminQuery, usePatchEquipmentPackToggleMutation } from "../../redux/api";

const MapUnpackedEquipment = () => {
    const token = useSelector((state) => state.auth.token)

    const { data, error, isLoading } = useGetAllEquipmentQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteEquipment] = useDeleteEquipmentMutation();
    const [packToggle] = usePatchEquipmentPackToggleMutation();
    //const [needToggle] = usePatchEquipmentNeedToggleMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            {data && data.filter((equipment) => equipment.packed === false).map((equipment) => (
                <Card key={equipment.id} sx={{ p: 1, m: 1, px: 2, backgroundColor: "linen" }}>
                    <Stack direction="row">
                        {token && adminData.isAdmin === true &&
                            <IconButton
                                color="error"
                                sx={{ pl: 0 }}
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this equipment?") === true) {
                                        deleteEquipment(equipment.id)
                                    }
                                }}>
                                <DeleteIcon fontSize="small" />
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
                                        const response = await packToggle({ id: equipment.id, packed: !equipment.packed });
                                        console.log(response);
                                    }} />
                                <Typography sx={{ py: 1 }}>Packed</Typography>
                            </>
                        }
                    </Stack>
                </Card>
            ))}
        </>
    )
}
export default MapUnpackedEquipment;