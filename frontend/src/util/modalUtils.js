import getModal from '../components/modals/index.js';

const renderModal = ({ modalInfo, hideModal }, channels) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return (
    <Component
      channels={channels}
      modalInfo={modalInfo}
      onHide={hideModal}
    />
  );
};

export default renderModal;
