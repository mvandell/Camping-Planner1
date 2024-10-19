import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useState } from "react";
import { usePostActivityMutation } from "../../redux/api";

const NewActivity = ({id}) => {
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);
    const [postActivity, {error, isLoading}] = usePostActivityMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postActivity({ name: name, campgroundId: id });
            setAlert(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <IconButton onClick={() => setAlert(true)} color="info">
                <AddIcon />
            </IconButton>
            {alert &&
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="New Activity"
                        value={name}
                        size="small"
                        sx={{ m: 1 }}
                        onChange={(event) => setName(event.target.value)} />
                    <IconButton type="submit" color="success" sx={{my: 1}}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => setAlert(false)} color="error">
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </form>
            }
        </>
    )
}
export default NewActivity;