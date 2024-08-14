import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostTripMutation } from "../../redux/api";

const NewTrip = () => {
    const navigate = useNavigate();
    const [postTrip, {error, isLoading}] = usePostTripMutation();

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
            const result = await postTrip({ startDate: start, endDate: end, gasTotal: Number(gasTotal), gasSingle: Number(gasSingle), fireNight: Number(fire), parking: Number(parking) });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Typography variant="h2" sx={{ mb: 1, color: "bisque" }}>
                    New Trip
                </Typography>
                <Card sx={{ backgroundColor: "linen", m: 2, p: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={start}
                            onChange={(event) => setStart(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
                        <TextField
                            label="End Date"
                            type="date"
                            value={end}
                            onChange={(event) => setEnd(event.target.value)}
                            size="small"
                            variant="filled"
                            sx={{ mx: 2, my: 1 }}
                            required />
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
                            <Button onClick={() => navigate("/trip/history")} variant="contained" sx={{ textTransform: "none" }}>
                                Cancel
                            </Button>
                        </Typography>
                    </form>
                </Card>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}
export default NewTrip;