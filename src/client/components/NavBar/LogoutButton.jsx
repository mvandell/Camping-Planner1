import Button from "@mui/material/Button";

import { useLogoutMutation } from "../../redux/api";

import { useNavigate } from "react-router-dom";

const LogoutButton = ({type, c}) => {
    const [logout, { data, error, isLoading }] = useLogoutMutation();
    const navigate = useNavigate();

    if (isLoading) {
        return null;
    }
    if (data) {
        console.log("logout", data);
    }
    if (error) {
        console.log("logout" + error)
    }
    return (
        <>
            <Button
                onClick={async () => { await logout(); navigate("/"); }}
                variant={type}
                color="success"
                sx={{ textTransform: "none", ":hover": { backgroundColor: c } }}>
                    Logout
            </Button>
        </>
    )
}
export default LogoutButton;