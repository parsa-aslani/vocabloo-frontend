// import
// react router
import { Link, Outlet, useLocation } from "react-router-dom";
// set jsx
const AdminNavbar = ({ searchusers }) => {
  const loggedUser = localStorage.getItem("user");
  const location = useLocation();
  return (
    <>
      <nav className="navbar admin-navbar py-3 shadow-lg px-1 px-md-4">
        <div className="d-flex flex-column flex-lg-row">
          <Link
            to={"/VocablooAdmin-42a5eb1wf/view-add-offer"}
            className="btn px-2 py-1 rounded btn-success mx-lg-2"
          >
            پیشنهاد افزودن
          </Link>
          <Link
            to={"/VocablooAdmin-42a5eb1wf/view-remove-offer"}
            className="btn px-2 py-1 rounded btn-danger mx-lg-2"
          >
            پیشنهاد حذف
          </Link>
        </div>
        {location.pathname === "/VocablooAdmin-42a5eb1wf" ? (
          <input
            type="search"
            className="form-control search-input mx-auto shadow w-50"
            placeholder="نام مخاطب ..."
            onChange={searchusers}
          />
        ) : null}

        <Link
          to={loggedUser ? "/homepage" : "/sighin"}
          className="btn px-2 py-1 rounded btn-secondary"
        >
          بازگشت
        </Link>
      </nav>
      <Outlet />
    </>
  );
};
export default AdminNavbar;
