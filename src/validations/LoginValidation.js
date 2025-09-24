import * as yup from "yup";
export const loginvalidation = yup.object().shape({
  username: yup
    .string()
    .required("نام کاربری اجباری میباشد")
    .max(20, "حد اکثر حروف 20 میباشد"),
  password: yup
    .string()
    .required("رمز عبور اجباری میباشد")
    .min(7, "حداقل حروف 7 میباشد ")
    .max(20, "حد اکثر حروف 20 میباشد"),
});
