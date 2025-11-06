import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { useState } from "react";
import { usePostFoodMutation, useGetAllUsersValidationQuery } from "../../redux/api";

const NewFood = ({ id }) => {
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(false);
    const [user, setUser] = useState("");
    const [food, setFood] = useState(null);

    const { data, error, isLoading } = useGetAllUsersValidationQuery();
    const [postFood] = usePostFoodMutation();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    const filter = createFilterOptions();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await postFood({ name: food, user: user });
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
                    <Autocomplete
                        value={name}
                        size="small"
                        sx={{ m: 1 }}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.inputValue) {
                                setFood(newValue.inputValue);
                            } else {
                                setFood(newValue);
                            }
                        }}
                        selectOnFocus
                        clearOnBlur
                        options={data}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.title;
                        }}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    {option.name}
                                </li>
                            );
                        }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="New Food" />
                        )}
                    />
                    <TextField
                        label="Assignee"
                        defaultValue={"Assignee"}
                        select
                        size="small"
                        sx={{ m: 1, width: '7vw' }}>
                        {data.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.username}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton type="submit" color="success" sx={{ my: 1 }}>
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
export default NewFood;