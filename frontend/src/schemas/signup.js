import * as Yup from "yup";
import i18n from "../locales/i18n";

export default Yup.object({
  username: Yup.string()
    .required(i18n.t("err.empty"))
    .min(3, i18n.t("err.length"))
    .max(20, i18n.t("err.length")),

  password: Yup.string()
    .required(i18n.t("err.empty"))
    .min(6, i18n.t("err.pswLength")),

  confirmPassword: Yup.string()
    .required(i18n.t("err.empty"))
    .oneOf([Yup.ref("password"), null], i18n.t("err.noMatch")),
});
