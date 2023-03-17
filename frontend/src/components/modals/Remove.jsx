import React, { useState } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { actions as channelsActions } from "../../slices/channelsSlice.js";
import { useTranslation } from "react-i18next";
import socket from "../../socket";
import getNotifications from "../../toast/toast.js";

const Remove = (props) => {
  const { onHide, currChat, setCurrentChannel, modalInfo } = props;

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  //   const [value, setValue] = useState('');
  const [submitDisabled, setDisabled] = useState(false); // до успешного ответа с бэкэнда
  const [submitError, setError] = useState("");
  // const socket = useContext(SocketContext);

  const handleSubmit = () => {
    setDisabled(true);

    socket.emit("removeChannel", { id: modalInfo.id }, (acknowledge) => {
      if (acknowledge.status === "ok") {
        setDisabled(false);
        console.log("channelsActions", channelsActions);
        dispatch(channelsActions.removeChannel(modalInfo.id));
        setCurrentChannel(1);
        onHide();
        getNotifications.removed();
      }
      // else {
      //   if (e.code === "ERR_NETWORK") {
      //     getNotifications.netFail();
      //   }
      else {
        setError(t("err.backErr"));
        setDisabled(false);
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t("chanActions.rmv")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t("chanActions.rmvConf")}
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t("btns.cancel")}
          </Button>
          <Form onClick={handleSubmit}>
            <Button
              type="submit"
              value="Submit"
              variant="danger"
              disabled={submitDisabled}
            >
              {" "}
              {t("btns.rmv")}{" "}
            </Button>
          </Form>

          {submitError && <Modal.Text>{submitError}</Modal.Text>}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
