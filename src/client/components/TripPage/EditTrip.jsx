import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatchTripMutation, useGetSingleTripQuery } from "../../redux/api";
import { format } from "date-fns";

const EditTrip = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data, error, isLoading } = useGetSingleTripQuery(id);
    const [patchTrip] = usePatchTripMutation();

    const [start, setStart] = useState(""); //date
    const [end, setEnd] = useState(""); //date
    const [gasTotal, setGasTotal] = useState(""); //int
    const [gasSingle, setGasSingle] = useState(""); //int
    const [fire, setFire] = useState(""); //int
    const [parking, setParking] = useState(""); //int

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        return <div> Error:{error.message} </div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await patchTrip({ startDate: start, endDate: end, gasTotal: Number(gasTotal), gasSingle: Number(gasSingle), fireNight: Number(fire), parking: Number(parking) });
        } catch (error) {
            console.error(error)
        }
    }
    const populateForm = (event) => {
        event.preventDefault();
        setStart(format(new Date(data.start), "yyyy-MM-dd"));
        setEnd(format(new Date(data.end), "yyyy-MM-dd"));
        setGasTotal(data.gasTotal);
        setGasSingle(data.gasSingle);
        setFire(data.fireNight);
        setParking(data.parking);
    }

    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
                <Typography variant="h2" sx={{ mb: 1, color: "bisque" }}>
                    Edit Campground
                </Typography>
                <Card sx={{ backgroundColor: "linen", m: 2, p: 2 }}>
                    <Typography textAlign="center" sx={{ m: 1, mb: 2 }}>
                        <Button onClick={populateForm} variant="contained" sx={{ textTransform: "none" }}>
                            Populate Form
                        </Button>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="row">
                        <label> Start Date:
                            <input
                                type="date"
                                name="startTime"
                                value={start}
                                onChange={(event) => { setStart(event.target.value) }} />
                        </label>
                        <label> End Date: 
                            <input
                                type="date"
                                name="endTime"
                                value={end}
                                onChange={(event) => { setEnd(event.target.value) }} />
                        </label></Stack>
                        <TextField
                            label="Gas Total"
                            type="number"
                            value={gasTotal}
                            onChange={(event) => setGasTotal(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Gas/person"
                            type="number"
                            value={gasSingle}
                            onChange={(event) => setGasSingle(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Firewood cost per night"
                            type="number"
                            value={fire}
                            onChange={(event) => setFire(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="Parking price"
                            type="number"
                            value={parking}
                            onChange={(event) => setParking(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <Typography textAlign="center" sx={{ m: 1 }}>
                            <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
                                Submit
                            </Button>
                        </Typography>
                        <Typography textAlign="center" sx={{ m: 1 }}>
                            <Button onClick={() => navigate("/campgrounds")} variant="contained" sx={{ textTransform: "none" }}>
                                Cancel
                            </Button>
                        </Typography>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    )
}
export default EditTrip;