import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountDropdown from "./AccountDropdown";
import CurrentTripButton from "./CurrentTripButton";

const NavBar = () => {
    const token = useSelector((state) => state.auth.token)

    return (
        <div>
            <Stack direction="row">
                <Typography variant="h4" sx={{ color: "beige", flexGrow: 1 }}>
                    Camping Planner
                </Typography>
                <Box sx={{ borderRadius: 5, backgroundColor: "aliceblue", boxShadow: 5, py: 0.5, px: 1 }}>
                    <CurrentTripButton type="text" c="#ADD9FF" />
                    {token &&
                        <Link to="/trip/history">
                            <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                                All Trips
                            </Button>
                        </Link>
                    }
                    <Link to="/campgrounds">
                        <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                            Campgrounds
                        </Button>
                    </Link>
                    <Link to="/equipment">
                        <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
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