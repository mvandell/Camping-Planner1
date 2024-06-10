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
                sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}
            >
                Account
            </Button>
            {token ? //logged in
                <div>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <MenuItem>
                        <Link to="/account">
                            <Button variant="text" sx={{ color: "#303036", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Account Page
                            </Button>
                        </Link>
                        </MenuItem>
                        <MenuItem>
                            <LogoutButton />
                        </MenuItem>
                    </Menu>
                </div>
                : //not logged in
                <div>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <MenuItem>
                        <Link to="/login">
                            <Button variant="text" sx={{ color: "#303036", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
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

