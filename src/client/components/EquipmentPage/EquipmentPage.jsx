import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { useSelector } from "react-redux";

import { usePostEquipmentMutation, useGetAdminQuery } from "../../redux/api";

import MapUnpackedEquipment from "./MapUnpackedEquipment";
import MapAllEquipment from "./MapAllEquipment";

const EquipmentPage = () => {
    const token = useSelector((state) => state.auth.token)

    const [alert, setAlert] = useState(false);
    const [unpacked, setUnpacked] = useState(false);
    const [name, setName] = useState("");

    const { data, error, isLoading } = useGetAdminQuery();
    const [postEquipment] = usePostEquipmentMutation();

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
            <Stack direction="row">
                <Switch
                    defaultChecked={unpacked}
                    sx={{ backgroundColor: "#B2702E", borderRadius: 5 }}
                    onChange={() => { setUnpacked(!unpacked) }} />
                <Typography sx={{ color: "beige", py: 1, ml: 1 }}>Unpacked only</Typography>
            </Stack>
            <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} sx={{ height: "85vh", overflowY: "scroll" }}>
                    {unpacked ?
                        <div>
                            <MapUnpackedEquipment />
                        </div>
                        :
                        <div>
                            <MapAllEquipment />
                        </div>
                }
                </Grid>
                <Grid item xs={4}>
                    {token && data.isAdmin === true &&
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
export default EquipmentPage;