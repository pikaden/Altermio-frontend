import { useAtom } from "jotai";
import userAtom from "../Authentication/Atom/userAtom";
import { Navigate, Outlet } from "react-router-dom";

const ModeratorLayout = () => {
    // const [user, setUser] = useAtom(userAtom);

    const currentUser = localStorage.getItem("user");
    
    const user = JSON.parse(currentUser)

    console.log( 'aaa: ' + JSON.stringify(user));

    if (user && user.role === 'moderator') return (
        // TODO: create moderator header
        <div className='header__container'>
            <Outlet />
        </div>
    )

    return (
        <Navigate to='/' />
    )
}

export default ModeratorLayout;