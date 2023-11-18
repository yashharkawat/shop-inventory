import { Outlet, useNavigate } from "react-router-dom";
import "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './config/firebase'

const Root = () => {
    const navigate = useNavigate();
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
        } else {
            navigate("/login");
        }
    });

    return <Outlet />;
};
export default Root;
