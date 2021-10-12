import React from 'react'
import './modal.css'

export default function Modal({open, children, onClose}) {
    if(!open) return null;
    return (
        <div className="modal_overlay">
            <div className="modal_container">
                <button onClick={onClose} className="close_btn">Close</button>
                {children}
            </div>
        </div>
    )
}
