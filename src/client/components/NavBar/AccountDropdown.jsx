import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";

const AccountDropdown = () => {
    const token = useSelector((state) => state.auth.token);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                variant="text"
                aria-controls={open ? 'policy-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="success"
                sx={{ textTransform: "none", mr: 2, ":hover": { backgroundColor: "#ADD9FF" } }}
            >
                Account
            </Button>
            {token ? //logged in
                <div>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        MenuListProps={{dense:true}}
                        onClose={handleClose}>
                        <MenuItem sx={{backgroundColor: "aliceblue"}}>
                            <Link to="/account">
                                <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                                    Account Page
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem sx={{backgroundColor: "aliceblue"}}>
                            <LogoutButton type="text" c="#ADD9FF" />
                        </MenuItem>
                    </Menu>
                </div>
                : //not logged in
                <div>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        MenuListProps={{dense:true}}
                        onClose={handleClose}>
                        <MenuItem sx={{backgroundColor: "aliceblue"}}>
                            <Link to="/login">
                                <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                                    Login
                                </Button>
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            }
        </>
    )
}

export default AccountDropdown;

