import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import AccountDropdown from "./AccountDropdown";

const NavBar = () => {
    return (
        <div>
            <Stack direction="row">
                <Typography variant="h1">
                    Camping Planner
                </Typography>
                <Box sx={{borderRadius: 5}}>
                    <Link>
                        <Button>
                            Current Trip
                        </Button>
                    </Link>
                    <Link>
                        <Button>
                            Campgrounds
                        </Button>
                    </Link>
                    <Link>
                        <Button>
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