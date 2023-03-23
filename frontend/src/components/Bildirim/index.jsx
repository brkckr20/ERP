import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const basarili = (message) => toast.success(message);
export const hatali = (message) => toast.error(message);
export const bilgi = (message) => toast.info(message);


const Bildirim = () => {
    return (
        <ToastContainer>Bildirim</ToastContainer>
    )
}

export default Bildirim