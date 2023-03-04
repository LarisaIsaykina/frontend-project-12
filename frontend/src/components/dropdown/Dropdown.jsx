// import React, { useState, useEffect, useRef, useContext } from 'react';

// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import getModal from '../modals/index.js';



// const DropdownBtn = ({ currChat, chatName, setCurrentChannel, id }) => {

//     const [modalInfo, setModalInfo] = useState({ type: null, item: null });

//     const hideModal = () => setModalInfo({ type: null, item: null });

//     const showModal = (type, item = null) => setModalInfo({ type, item });


//     const renderModal = ({ modalInfo, hideModal }) => {
//         if (!modalInfo.type) {
//         return null;
//     }
  
//     const Component = getModal(modalInfo.type);
//         return <Component modalInfo={modalInfo} onHide={hideModal} />;
//     };

//     return (
//         <>
      
//     <Dropdown as={ButtonGroup}>
//     <Button onClick={() => setCurrentChannel(id)} variant="secondary"><span className="me-1"># {chatName}</span></Button>
//       <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

//       <Dropdown.Menu>
//         <Dropdown.Item onClick={() => showModal('removeChat')}>Удалить</Dropdown.Item>
//         <Dropdown.Item onClick={() => showModal('renameChat')}>Переименовать</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>

//     {renderModal({ modalInfo, hideModal, currChat })}
//     </>
     
//     );
// }

// export default DropdownBtn;