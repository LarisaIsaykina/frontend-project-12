import * as Yup from "yup";
import i18n from "../locales/i18n";

export default (channels) => {
  return Yup.string()
    .required(i18n.t("err.empty"))
    .min(3, i18n.t("err.length"))
    .max(20, i18n.t("err.length"))
    .notOneOf(channels, i18n.t("err.uniq"));
};
