import { useAtom } from "jotai";
import userAtom from "../Authentication/Atom/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const CourierLayout = () => {
    // const [user, setUser] = useAtom(userAtom);

    const currentUser = localStorage.getItem("user");
    
    const user = JSON.parse(currentUser)

    if (user && user.role === 'courier') return (
        // TODO: create courier header
        <div className='header__container'>
            <Outlet />
        </div>
    )

    return (
        <Navigate to='/' />
    )
}

export default CourierLayout;