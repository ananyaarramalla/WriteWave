import "./UserProfile.css";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <>
     <NavLink to='articles' className='arthead nav-link mt-4'>Articles</NavLink>
      <Outlet />
    </>
  );
}

export default UserProfile;