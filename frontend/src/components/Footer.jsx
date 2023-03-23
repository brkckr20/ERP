import React, { useState, useEffect } from 'react';
import ActiveMenuList from './ActiveMenuList';
import { useSelector } from 'react-redux';
import pj from '../../package.json'


const Footer = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime, setTime] = useState(time)
    const UpdateTime = () => {
        time = new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime);

    const [db, setDb] = useState({});
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const [user, setUser] = useState({});



    useEffect(() => {
        const dbName = JSON.parse(localStorage.getItem("dbName"));
        setDb(dbName);
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user)
    }, [])


    useEffect(() => {
        function handleKeyDown(event) {
            if (event.getModifierState('CapsLock')) {
                setIsCapsLockOn(true);
            } else {
                setIsCapsLockOn(false);
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className='absolute left-0 bottom-0 right-0 bg-slate-800'>
                {/* <ActiveMenuList /> */}
                <ul className='flex divide-x gap-x-2 px-2'>
                    <li className='text-white'>PORTAL v.{pj.version}</li>
                    <li className='text-white pl-2 w-[80px] text-center'>{ctime}</li>
                    <li className='text-white pl-2'>{user.TAM_ISIM}</li>
                    <li className='text-white pl-2'>Mail : {user.MAIL_ADRESI}</li>
                    <li className='text-white pl-2'>Database : {(db.db)?.toUpperCase()}</li>
                    <li className='text-white pl-2'>Capslock : {isCapsLockOn ? 'AÇIK' : 'KAPALI'}</li>
                </ul>
            </div>
        </>
    )
}

export default Footer