import Button from "@mui/material/Button"

import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { useGetCurrentTripIdQuery } from "../../redux/api";

const CurrentTripButton = ({type, c}) => {
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
else {return <div></div>}

    return (
        <>
            {token &&
                <Link to={`/trip/${data.id}`}>
                    <Button variant={type} color="success" sx={{ textTransform: "none", ml: 2, ":hover": { backgroundColor: c } }}>
                        Current Trip
                    </Button>
                </Link>
            }
        </>
    )
}

export default CurrentTripButton