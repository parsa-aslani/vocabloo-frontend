// import
import { Loader } from "../index";
import { loginvalidation } from "../../validations/LoginValidation";
import { UsernameFieldIn } from "../../utils/UserNameField";
import { PasswordFieldIn } from "../../utils/PasswordField";
import { useEffect } from "react";
// formik
import { Form, Formik, Field } from "formik";
// react router
import { Link, useNavigate } from "react-router-dom";
// react toastify
import { toast } from "react-toastify";
// react particles
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Collisions } from "../../utils/particle";
// set jsx
const SighIn = ({ loading, checkuser, users }) => {
  const navigate = useNavigate();
  // set particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="home-page-background w-100">
      <Particles id="tsparticles" options={Collisions} />
      <div className="sigh-in-box d-flex justify-content-center align-items-center">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={loginvalidation}
          onSubmit={(values) => {
            let chechuserdata = true;
            if (
              values.username === "Parsa-Admin" &&
              values.password === "parsina13901387"
            ) {
              navigate(process.env.REACT_APP_ADMIN_URL);
            } else {
              users.map((user) => {
                if (
                  user.password === values.password &&
                  user.username === values.username
                ) {
                  checkuser(values);
                  chechuserdata = false;
                }
              });
              if (chechuserdata === true) {
                toast.error("نام کاربری یا رمز عبور اشتباه است!");
              }
            }
          }}
        >
          <Form className="sigh-in-form px-3 py-2 shadow">
            <h4 className="fw-bold mb-2 my-auto text-white login-title">
              ورود به <span className="site-name">vocabloo</span>
            </h4>
            <div className="w-100 text-end my-3">
              <Link to={"/sighup"} className="go-sigh-up text-start">
                تا الان ثبت نام نکردی ؟ <span>(ثبت نام)</span>
              </Link>
            </div>

            <div className="input-box d-flex align-items-center mb-3">
              <Field
                type="text"
                className="form-control login-input in-input"
                name="username"
                required
              />
              <UsernameFieldIn />
            </div>
            <div class="input-box d-flex align-items-center my-3">
              <Field
                type="text"
                class="form-control login-input in-input"
                name="password"
                required
              />
              <PasswordFieldIn />
            </div>
            <button
              type="submit"
              className="w-100 btn sigh-in-btn py-2 mt-2 shadow"
            >
              تایید ورود
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default SighIn;
