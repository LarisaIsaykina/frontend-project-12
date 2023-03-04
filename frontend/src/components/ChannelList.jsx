import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import getModal from './modals/index.js';
// import socket from '../../../App';
import { SocketContext } from '../contexts/SocketContext.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import Button from 'react-bootstrap/Button';
import SplitButton from 'react-bootstrap/SplitButton';

import Dropdown from 'react-bootstrap/Dropdown';


import { fetchChannels } from '../slices/channelsSlice.js';

const Channels = ({ setCurrentChannel, state }) => {
    const [channelsOnPage, setChannels] = useState(null);
    
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchChannels()); // запрос на получение с сервера каналов

    }, [dispatch]);

    const channels = useSelector((state) => Object.values(state.channels.entities)); // обращение к состоянию


    const [modalInfo, setModalInfo] = useState({ type: null, item: null });

    const hideModal = () => setModalInfo({ type: null, item: null });

    const showModal = (type, item = null) => setModalInfo({ type, item });

    
    const renderModal = ({ modalInfo, hideModal, setItems }) => {
        if (!modalInfo.type) {
          return null;
        }
      
        const Component = getModal(modalInfo.type);
        return <Component modalInfo={modalInfo} onHide={hideModal} setCurrentChannel={setCurrentChannel}/>;
      };


    return (
        <>
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button onClick={() => showModal('addChat')} type="button" className="p-0 text-primary btn btn-group-vertical"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg></button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ name, id, removable }) => {
                    const bntClasses = cn('w-100 rounded-0 text-start btn', {
                        'btn-secondary': state === id,
            
                    });
                    const dropDwnClasses =  cn({
                        'secondary': state === id,
                        'outline-secondary': state !== id,
                    });
                    return (
                        removable? (<li key={id} className="nav-item w-100">
                    
                            <SplitButton className="w-100 mb-3" onClick={() => setCurrentChannel(id)}
                            key={id}
                            id={`dropdown-split-variants-${dropDwnClasses}`}
                            title={name}
                            variant={dropDwnClasses}
                            >                            
                            <Dropdown.Item onClick={() => showModal('removeChat')}>Удалить</Dropdown.Item>
                                       
                            </SplitButton>
                
                    </li>) :                    
                     (<li key={id} className="nav-item w-100"><button id={id} onClick={() => setCurrentChannel(id)} type="button" className={bntClasses}><span className="me-1">#</span>{ name }</button></li>)
                    )
})}
            </ul>
        </div>
        {renderModal({ modalInfo, hideModal })}
        </>
    )
};

export default Channels;



