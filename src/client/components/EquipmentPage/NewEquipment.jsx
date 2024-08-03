import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState } from "react";
import { usePostEquipmentMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";

const NewEquipment = () => {
    const navigate = useNavigate();
    const [postEquipment, { error, isLoading }] = usePostEquipmentMutation();

    const [name, setName] = useState("");

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem submitting the info.</div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postEquipment({ name: name });
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction="column">
                <TextField
                    label="New Equipment"
                    value={name}
                    size="small"
                    sx={{ m: 1 }}
                    onChange={(event) => setName(event.target.value)} />
                    <Typography textAlign="center">
                <Button type="submit" variant="contained" sx={{m:1, mb: 2, width: "30%", textTransform: "none"}}>
                    Submit
                </Button>
                </Typography>
            </Stack>
        </form>
    )
}
export default NewEquipment;