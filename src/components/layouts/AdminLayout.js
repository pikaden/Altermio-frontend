import { useAtom } from "jotai";
import userAtom from "../Authentication/Atom/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const [user, setUser] = useAtom(userAtom);

    console.log( 'aaa: ' + JSON.stringify(user));

    if (user && user.role === 'admin') return (
        // TODO: create admin header
        <div className='header__container'>
            <Outlet />
        </div>
    )

    return (
        <Navigate to='/' />
    )
}

export default AdminLayout;