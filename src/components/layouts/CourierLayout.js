import { useAtom } from "jotai";
import userAtom from "../Authentication/Atom/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const CourierLayout = () => {
    const [user, setUser] = useAtom(userAtom);

    console.log( 'aaa: ' + JSON.stringify(user));

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