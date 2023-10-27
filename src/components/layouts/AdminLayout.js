
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {

    const currentUser = localStorage.getItem("user");
    
    const user = JSON.parse(currentUser)


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