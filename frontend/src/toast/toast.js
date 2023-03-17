import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../locales/i18n";

const getNotifications = {
  added: () => {
    toast.success(i18n.t("success.added"), {
      position: toast.POSITION.TOP_RIGHT,
    });
  },
  renamed: () => {
    toast.success(i18n.t("success.renamed"), {
      position: toast.POSITION.TOP_RIGHT,
    });
  },
  removed: () => {
    toast.success(i18n.t("success.removed"), {
      position: toast.POSITION.TOP_RIGHT,
    });
  },

  netFail: () => {
    toast.error(i18n.t("err.network"), {
      position: toast.POSITION.TOP_RIGHT,
    });
  },
  // toast.error("Error Notification !", {
  //   position: toast.POSITION.TOP_LEFT,
  // });

  // toast("Custom Style Notification with css class!", {
  //   position: toast.POSITION.BOTTOM_RIGHT,
  //   className: "foo-bar",
  // });
};

export default getNotifications;
