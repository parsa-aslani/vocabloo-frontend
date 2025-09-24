import { useFormikContext } from "formik";
export const UsernameFieldIn = () => {
  const { errors, touched } = useFormikContext();

  return touched.username && errors.username ? (
    <label className="in-label login-form-label px-2 error-label-in">
      {errors.username}
    </label>
  ) : (
    <label className="in-label login-form-label px-2">نام کاربری</label>
  );
};
export const UsernameFieldUp = () => {
  const { errors, touched } = useFormikContext();

  return touched.username && errors.username ? (
    <label className="up-label login-form-label px-2 error-label-up">
      {errors.username}
    </label>
  ) : (
    <label className="up-label login-form-label px-2">نام کاربری</label>
  );
};
