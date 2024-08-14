import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useSelector } from "react-redux";

import { useGetAllEquipmentQuery, useDeleteEquipmentMutation, useGetAdminQuery } from "../../redux/api";
import { usePostEquipmentMutation, usePatchEquipmentPackToggleMutation, usePatchEquipmentNeedToggleMutation } from "../../redux/api";

const EquipmentPage = () => {
    const token = useSelector((state) => state.auth.token)

    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("");

    const { data, error, isLoading } = useGetAllEquipmentQuery();
    const { data: adminData, error: adminError, isLoading: adminIsLoading } = useGetAdminQuery();
    const [deleteEquipment] = useDeleteEquipmentMutation();
    const [postEquipment] = usePostEquipmentMutation();
    const [packToggle] = usePatchEquipmentPackToggleMutation();
    //const [needToggle] = usePatchEquipmentNeedToggleMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //TODO: fix isAdmin error on first render

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postEquipment({ name: name });
            setAlert(false)
        } catch (error) {
            console.error(error)
        }
    }

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
                <Grid item xs={4}>
                    {token && adminData.isAdmin === true &&
                        <Typography textAlign="center">
                            <Button variant="contained" onClick={() => setAlert(true)} sx={{ textTransform: "none" }}>
                                New Equipment
                            </Button>
                        </Typography>
                    }
                    {alert && 
                        <Card sx={{ p: 2, textAlign: "center", mx: 3, my: 1 }}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="New Equipment"
                                    value={name}
                                    size="small"
                                    sx={{ m: 1 }}
                                    onChange={(event) => setName(event.target.value)} />
                                <Button type="submit" variant="contained" sx={{ textTransform: "none", m: 1 }}>
                                    Submit
                                </Button>
                                <Button variant="contained" onClick={() => setAlert(false)} sx={{ textTransform: "none", m: 1 }}>
                                    Cancel
                                </Button>
                            </form>
                        </Card>
                    }
                </Grid>
            </Grid>

        </div>
    )
}
export default EquipmentPage