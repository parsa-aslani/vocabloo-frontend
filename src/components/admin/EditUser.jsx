// import
import { getuserwithid } from "../../services/usersservices";
// formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
// react router
import { Link, useParams } from "react-router-dom";
// set jsx
const EditUser = ({ putedit }) => {
  const { userId } = useParams();
  // state
  const [editdata, seteditdata] = useState({});
  //  get user data
  useEffect(() => {
    const getedituser = async () => {
      try {
        const { data } = await getuserwithid(userId);
        seteditdata(data);
      } catch (err) {
        console.log(err);
      }
    };
    getedituser();
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center edituser-container">
      <Formik
        initialValues={editdata}
        enableReinitialize={true}
        onSubmit={(value) => {
          putedit(value, userId);
        }}
      >
        <Form className="edituser-form shadow p-3">
          <h3 className="edituser-form-title mb-3">ویرایش کربر</h3>
          <hr className="text-white" />
          <div className="text-end my-2">
            <label htmlFor="" className="form-label px-1 text-white">
              نام کاربری
            </label>
            <Field
              type="text"
              className="form-control rounded"
              name="username"
              placeholder="نام کاربری ..."
            />
          </div>
          <div className="text-end my-2">
            <label htmlFor="password" className="form-label px-1 text-white">
              رمزعبور
            </label>
            <Field
              type="text"
              className="form-control rounded"
              name="password"
              id="password"
              placeholder="نام کاربری ..."
            />
          </div>
          <div className="text-end my-2">
            <label htmlFor="score" className="form-label px-1 text-white">
              امتیاز
            </label>
            <Field
              type="text"
              className="form-control rounded"
              name="score"
              id="score"
              placeholder="نام کاربری ..."
            />
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <button
              type="submit"
              className="mx-1 py-2 rounded btn edituser-btn"
            >
              تایید ویرایش
            </button>
            <Link
              to={"/VocablooAdmin-42a5eb1wf"}
              className="mx-1 py-2 rounded btn edituser-btn"
            >
              انصراف
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default EditUser;
