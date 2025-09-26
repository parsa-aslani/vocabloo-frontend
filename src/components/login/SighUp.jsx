// import
import { Loader } from "../index";
import { loginvalidation } from "../../validations/LoginValidation";
import { UsernameFieldUp } from "../../utils/UserNameField";
import { PasswordFieldUp } from "../../utils/PasswordField";
import { useEffect } from "react";
// formik
import { Form, Formik, Field } from "formik";
// react router
import { Link } from "react-router-dom";
// react toasttify
import { toast } from "react-toastify";
// react particles
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Collisions } from "../../utils/particle";
const SighUp = ({ loading, postuserdata, users }) => {
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
            score: 20,
          }}
          validationSchema={loginvalidation}
          onSubmit={(values) => {
            let checkusername = true;
            users.map((user) => {
              if (
                user.username === values.username ||
                values.username === "Parsa-Admin"
              ) {
                checkusername = false;
                toast.error("نام کاربری استفاده شده است");
              }
            });
            if (checkusername === true) {
              postuserdata(values);
            }
          }}
        >
          <Form className="sigh-up-form px-3 py-2 shadow">
            <h4 className="fw-bold mb-2 my-auto login-title-up">
              به <span className="text-white">vocabloo</span> خوش امدید !
            </h4>
            <div className="w-100 text-end my-3">
              <Link to={"/sighin"} className="go-sigh-in text-start">
                از قبل اکانت ساختی ؟ <span>(ورود به سایت)</span>
              </Link>
            </div>
            <div class="input-box d-flex align-items-center mb-3">
              <Field
                type="text"
                class="form-control login-input up-input"
                name="username"
                required
              />
              <UsernameFieldUp />
            </div>
            <div class="input-box d-flex align-items-center my-3">
              <Field
                type="text"
                class="form-control login-input up-input"
                name="password"
                required
              />
              <PasswordFieldUp />
            </div>
            <button
              type="submit"
              className="w-100 btn sigh-up-btn py-2 mt-2 shadow"
            >
              تایید ثبت نام
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default SighUp;
