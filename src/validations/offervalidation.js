import * as yup from "yup";
export const offerAddValidations = yup.object().shape({
  offeraddword: yup
    .string()
    .required("کلمه پیشنهادی اجباری میباشد")
    .min(4, "حداقل حروف 4 میباشد")
    .max(8, "حداکثر حروف 8 میباشد"),
});
export const offerRemoveValidations = yup.object().shape({
  offerremoveword: yup
    .string()
    .required("کلمه پیشنهادی اجباری میباشد")
    .min(4, "حداقل حروف 4 میباشد")
    .max(8, "حداکثر حروف 8 میباشد"),
});
