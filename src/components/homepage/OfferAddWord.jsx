// import
import { useRef } from "react";
import { OfferAddField } from "../../utils/offerField";
import { offerAddValidations } from "../../validations/offervalidation";
import { postaddoffer } from "../../services/usersservices";
// formik
import { Formik, Form, Field } from "formik";
// react router
import { Link } from "react-router-dom";
// context
// context
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
// set jsx
const OfferAddWord = () => {
  const { checkofferword } = useContext(MainContext);
  const inputref = useRef(null);
  return (
    <div>
      <h2 className="mt-3 start-guess-title">پیشنهاد افزودن کلمه</h2>
      <div className="start-guess-underline mx-auto mt-4"></div>
      <div className="d-flex justify-content-center align-items-center offerform-box">
        <Formik
          initialValues={{
            offeraddword: "",
          }}
          validationSchema={offerAddValidations}
          onSubmit={(value) => {
            checkofferword(
              value.offeraddword,
              () => postaddoffer(value),
              "پیشنهاد افزودن کلمه ارسال شد",
              "این کلمه وجود دارد",
              null,
              null
            );

            inputref.current.value = "";
          }}
        >
          <Form className="d-flex flex-column offeradd-form p-3 rounded shadow">
            <p>پس از ارسال کلمه در صورت تایید به کلمات بازی اضافه خواهد شد</p>
            <div className="input-box d-flex align-items-center mb-3 ">
              <Field
                ref={inputref}
                type="text"
                className="form-control login-input offer-input"
                name="offeraddword"
                required
              />
              <OfferAddField />
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
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default OfferAddWord;
