import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentTripIdQuery } from "../../redux/api";
import AccountDropdown from "./AccountDropdown";
import CurrentTripButton from "./CurrentTripButton";

const NavBar = () => {

    return (
        <div>
            <Stack direction="row">
                <Typography variant="h4" sx={{ color: "beige", flexGrow: 1 }}>
                    Camping Planner
                </Typography>
                <Box sx={{ borderRadius: 5, backgroundColor: "beige", boxShadow: 5, py: 0.5, px: 1 }}>
                    <CurrentTripButton />
                    <Link to="/trip/history">
                        <Button variant="text" sx={{ textTransform: "none" }}>
                            All Trips
                        </Button>
                    </Link>
                    <Link to="/campgrounds">
                        <Button variant="text" sx={{ textTransform: "none" }}>
                            Campgrounds
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="text" sx={{ textTransform: "none" }}>
                            Equipment
                        </Button>
                    </Link>
                    <AccountDropdown />
                </Box>
            </Stack>
        </div>
    )
}
export default NavBar