import { useFormikContext } from "formik";
export const PasswordFieldIn = () => {
  const { errors, touched } = useFormikContext();

  return touched.password && errors.password ? (
    <label className="in-label login-form-label px-2 error-label-in">
      {errors.password}
    </label>
  ) : (
    <label className="in-label login-form-label px-2">رمز عبور</label>
  );
};
export const PasswordFieldUp = () => {
  const { errors, touched } = useFormikContext();

  return touched.password && errors.password ? (
    <label className="up-label login-form-label px-2 error-label-up">
      {errors.password}
    </label>
  ) : (
    <label className="up-label login-form-label px-2">رمز عبور</label>
  );
};
