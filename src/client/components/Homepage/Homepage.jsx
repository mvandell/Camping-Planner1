import Typography from '@mui/material/Typography';
import ForestIcon from '@mui/icons-material/Forest';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CurrentTripButton from '../NavBar/CurrentTripButton';
import LogoutButton from '../NavBar/LogoutButton';

const Homepage = () => {
    const token = useSelector((state) => state.auth.token)

    return (
        <>
            <Typography variant='h1'>
                <ForestIcon sx={{ mx: 6 }} fontSize="large" color="success" />
                Camping Planner
                <ForestIcon sx={{ mx: 6 }} fontSize="large" color="success" />
            </Typography>
            <CurrentTripButton />
            {token &&
                <Link to="/trip/history">
                    <Button variant="outlined" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                        All Trips
                    </Button>
                </Link>
            }
            <Link to="/campgrounds">
                <Button variant="outlined" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                    Campgrounds
                </Button>
            </Link>
            <Link to="/">
                <Button variant="outlined" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                    Equipment
                </Button>
            </Link>
            {token ? //logged in
                <>
                    <Link to="/account">
                        <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                            Account Page
                        </Button>
                    </Link>
                    <LogoutButton />
                </>
                : //not logged in
                <>
                    <Link to="/login">
                        <Button variant="text" color="success" sx={{ textTransform: "none", ":hover": { backgroundColor: "#ADD9FF" } }}>
                            Login
                        </Button>
                    </Link>
                </>
            }
        </>
    )
}
export default Homepage;