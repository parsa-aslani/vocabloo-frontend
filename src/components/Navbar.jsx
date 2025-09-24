// import
// react router
import { Outlet, useNavigate } from "react-router-dom";
// react icons
import { ImExit } from "react-icons/im";
import { FaUserAstronaut } from "react-icons/fa6";
// sweetalert 2
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "از خروج از اکانت مطمئن هستید ؟",
      text: "درصورت خروج دوباره با وارد کردن رمز عبور و نام کاربری میتوانید وارد شوید",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "خروج از اکانت",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/sighin");
        toast.success("با فوفقیت از اکانت خارج شدید");
      }
    });
  };
  return (
    <>
      {user && console.log(user)}
      <nav className="navbar site-navbar px-2 px-md-4 shadow ">
        <div className="navbar-brand d-flex px-1">
          <p className="my-auto navbar-text d-none d-md-block">
            بازی حدس کلمه{" "}
          </p>
          <img
            src={require("../assets/image/domingo-1756830110081.png")}
            alt="vocabloo"
            className="vocabloo-icon"
          />
        </div>
        <div className="d-flex">
          <div className="my-auto">
            <button
              onClick={handleLogout}
              className="btn rounded mx-2 mx-sm-3 mx-md-4 logout-btn d-flex align-items-center"
            >
              خروج <ImExit className="me-1" />
            </button>
          </div>
          {user && (
            <h6 className="profile my-auto">
              <FaUserAstronaut className="ms-1" /> {user.username} -{" "}
              <span className="your-score">امتیاز: {user.score} </span>
            </h6>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
