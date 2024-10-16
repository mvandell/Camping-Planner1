import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useState } from "react";

const NewActivity = ({postActivity}) => {
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postActivity({ name: name });
            setAlert(false)
        } catch (error) {
            console.error(error)
        }
    } 

    return (
        <div>
            <IconButton onClick={setAlert(true)} color="info">
                <AddIcon />
            </IconButton>
            {alert &&
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="New Activity"
                    value={name}
                    size="small"
                    sx={{m: 1}}
                    onChange={(event) => setName(event.target.value)} />
                    <IconButton type="submit" color="success">
                        <CheckIcon fontSize="small"/>
                    </IconButton>
                    <IconButton onClick={setAlert(false)} color="error">
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </form>
            }
        </div>
    )
}
export default NewActivity;