import Typography from '@mui/material/Typography';
import ForestIcon from '@mui/icons-material/Forest';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrentTripButton from '../NavBar/CurrentTripButton';
import LogoutButton from '../NavBar/LogoutButton';

const Homepage = () => {
    const token = useSelector((state) => state.auth.token)

    return (
        <Box sx={{my: "20%"}}>
            <Typography variant='h1' textAlign="center">
                <ForestIcon sx={{ mx: 6 }} fontSize="large" color="success" />
                Camping Planner
                <ForestIcon sx={{ mx: 6 }} fontSize="large" color="success" />
            </Typography>
            <Box sx={{textAlign:"center"}}>
                <CurrentTripButton type="contained" c="#174F1B" />
                {token &&
                    <Link to="/trip/history">
                        <Button variant="contained" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#174F1B" } }}>
                            All Trips
                        </Button>
                    </Link>
                }
                <Link to="/campgrounds">
                    <Button variant="contained" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#174F1B" } }}>
                        Campgrounds
                    </Button>
                </Link>
                <Link to="/">
                    <Button variant="contained" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#174F1B" } }}>
                        Equipment
                    </Button>
                </Link>
                {token ? //logged in
                    <>
                        <Link to="/account">
                            <Button variant="contained" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#174F1B" } }}>
                                Account Page
                            </Button>
                        </Link>
                        <LogoutButton type="contained" c="#174F1B" />
                    </>
                    : //not logged in
                    <>
                        <Link to="/login">
                            <Button variant="contained" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#174F1B" } }}>
                                Login
                            </Button>
                        </Link>
                    </>
                }
            </Box>
        </Box>
    )
}
export default Homepage;