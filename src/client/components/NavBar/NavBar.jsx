import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentTripIdQuery } from "../../redux/api";
import AccountDropdown from "./AccountDropdown";

const NavBar = () => {
    const token = useSelector((state) => state.auth.token)
    const { data, error, isLoading } = useGetCurrentTripIdQuery();

    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    console.log(data);
    return (
        <div>
            <Stack direction="row">
                <Typography variant="h4" sx={{ color: "beige", flexGrow: 1 }}>
                    Camping Planner
                </Typography>
                <Box sx={{ borderRadius: 5, backgroundColor: "beige", boxShadow: 5, py: 0.5 }}>
                    {token &&
                        <Link to={`/trip/${data.id}`}>
                            <Button variant="text" sx={{ textTransform: "none", ml: 2 }}>
                                Current Trip
                            </Button>
                        </Link>
                    }
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