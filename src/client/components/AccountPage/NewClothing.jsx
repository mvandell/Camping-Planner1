import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useState } from "react";
import { usePostClothingMutation } from "../../redux/api";

const NewClothing = () => {
    const [name, setName] = useState("");

    const [postClothing, { error, isLoading }] = usePostClothingMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div> Sorry! There's a problem posting the clothing. </div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postClothing({ name })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card sx={{ p: 2, m: 2, backgroundColor: "linen" }}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column">
                    <TextField
                        label="New Clothing"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        size="small"
                        variant="filled" />
                    <Typography textAlign="center" sx={{ m: 1, mt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
                            Submit
                        </Button>
                    </Typography>
                </Stack>
            </form>
        </Card>
    )
}
export default NewClothing;