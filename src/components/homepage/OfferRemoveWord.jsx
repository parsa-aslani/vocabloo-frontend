// import
import { OfferRemoveField } from "../../utils/offerField";
import { offerRemoveValidations } from "../../validations/offervalidation";
import { postremoveoffer } from "../../services/usersservices";
import { useRef } from "react";
// formik
import { Formik, Form, Field } from "formik";
// react router
import { Link } from "react-router-dom";
// context
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
// set jsx
const OfferRemoveWord = () => {
  const { checkofferword } = useContext(MainContext);
  const inputref = useRef(null);
  return (
    <div>
      <h2 className="mt-3 start-guess-title">پیشنهاد حذف کلمه</h2>
      <div className="start-guess-underline mx-auto mt-4"></div>
      <div className="d-flex justify-content-center align-items-center offerform-box">
        <Formik
          initialValues={{
            offerremoveword: "",
          }}
          validationSchema={offerRemoveValidations}
          onSubmit={(value) => {
            checkofferword(
              value.offerremoveword,
              null,
              "پیشنهاد حذف کلمه ارسال شد",
              null,
              () => postremoveoffer(value),
              "کلمه وجود ندارد"
            );
            inputref.current.value = "";
          }}
        >
          <Form className="d-flex flex-column offeradd-form p-3 rounded shadow">
            <p>
              درصورتی که کلمه ای بی معنی در بازی مشاهده کردید با ار سال کلمه پس
              از تایید کلمه حذف خواهد شد
            </p>
            <div className="input-box d-flex align-items-center mb-3 ">
              <Field
                ref={inputref}
                type="text"
                className="form-control login-input offer-input"
                name="offerremoveword"
                required
              />
              <OfferRemoveField />
            </div>
            <div>
              <button
                type="submit"
                className="btn submit-offerword px-3 py-2 my-auto rounded shadow-sm ms-2"
              >
                ارسال کلمه
              </button>
              <Link
                to={"/homepage"}
                type="submit"
                className="btn offer-go-home px-3 py-2 my-auto rounded shadow-sm me-2"
              >
                صفحه اصلی
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default OfferRemoveWord;
