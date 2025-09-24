// import
// react icons
import { BsTrash3Fill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
// set jsx
const AdminUserList = ({ filterusers, deletealert, users }) => {
  return (
    <>
      <div className="mt-3 mb-4">
        <h2 className="user-list-title pb-3 w-75 mx-auto">لیست کاربران</h2>
      </div>
      <div>
        <Link
          to={"/VocablooAdmin-42a5eb1wf/four-letter"}
          className="btn px-2 py-2 mx-2 shadow-sm rounded btn-primary"
        >
          کلمات چهار حرفی
        </Link>
        <Link
          to={"/VocablooAdmin-42a5eb1wf/five-letter"}
          className="btn px-2 py-2 mx-2 shadow-sm rounded btn-dark"
        >
          کلمات پنج حرفی
        </Link>
        <Link
          to={"/VocablooAdmin-42a5eb1wf/six-letter"}
          className="btn px-2 py-2 mx-2 shadow-sm rounded btn-warning"
        >
          کلمات شش حرفی
        </Link>
      </div>
      <div className="row user-list-container mx-auto mt-3">
        {filterusers &&
          filterusers.map((user, index) => (
            <div
              className="col-12 col-md-6 col-lg-4 col-xl-3 my-3 my-md-0"
              key={index}
            >
              <div className="d-flex flex-column user-card p-2 shadow mx-auto">
                <div className="d-flex justify-content-center mb-3">
                  <button
                    onClick={() => {
                      deletealert(user.id);
                    }}
                    className="user-card-btn btn trash mx-2 py-1 shadow"
                  >
                    <BsTrash3Fill />
                  </button>
                  <Link
                    to={`/VocablooAdmin-42a5eb1wf/edituser/${user.id}`}
                    className="user-card-btn btn edit mx-2 py-1 shadow"
                  >
                    <MdModeEdit />
                  </Link>
                </div>
                <div>
                  <p className="py-1 px-2 rounded shadow-sm w-100 text-end user-data-title my-1">
                    نام کاربری :{" "}
                    <span className="user-data">{user.username}</span>
                  </p>
                  <p className="py-1 px-2 rounded shadow-sm w-100 text-end user-data-title my-2">
                    رمزعبور : <span className="user-data">{user.password}</span>
                  </p>
                  <p className="py-1 px-2 rounded shadow-sm w-100 text-end user-data-title my-1">
                    امتیاز : <span className="user-data">{user.score}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default AdminUserList;
