import { useFormikContext } from "formik";
export const OfferAddField = () => {
  const { errors, touched } = useFormikContext();

  return touched.offeraddword && errors.offeraddword ? (
    <label className="offer-label login-form-label px-2 error-label-in">
      {errors.offeraddword}
    </label>
  ) : (
    <label className="offer-label login-form-label px-2">کلمه پیشنهادی</label>
  );
};
export const OfferRemoveField = () => {
  const { errors, touched } = useFormikContext();

  return touched.offerremoveword && errors.offerremoveword ? (
    <label className="offer-label login-form-label px-2 error-label-in">
      {errors.offerremoveword}
    </label>
  ) : (
    <label className="offer-label login-form-label px-2">کلمه پیشنهادی</label>
  );
};
