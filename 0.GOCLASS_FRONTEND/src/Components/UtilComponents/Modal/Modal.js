import React, { useContext } from 'react';

import './Modal.css';
import AUX from '../Auxiliary/Auxiliary'
import { ModalContext } from '../../../App';

const Modal = (props) => {

    const [showModal, setShowModal] = useContext(ModalContext);

    return (
        <AUX>
            { showModal ? <div className="Backdrop" ></div> : null}
            
            <div className="Modal"
                style={{
                    transform: showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}>

                {props.children}
            </div>
        </AUX>)
}

export default Modal;