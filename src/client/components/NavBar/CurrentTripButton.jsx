import Button from "@mui/material/Button"

import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { useGetCurrentTripIdQuery } from "../../redux/api";

const CurrentTripButton = () => {
    const token = useSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetCurrentTripIdQuery();
if (token) {
    if (isLoading) {
        return <div></div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
}
    return (
        <>
            {token &&
                <Link to={`/trip/${data.id}`}>
                    <Button variant="text" sx={{ textTransform: "none", ml: 2 }}>
                        Current Trip
                    </Button>
                </Link>
            }
        </>
    )
}

export default CurrentTripButton