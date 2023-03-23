import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { removeMenu } from '../../redux/ActiveMenu/ActiveMenuSlice';

const ActiveMenuList = () => {
    const menuListesi = useSelector((state) => state.activeMenu.menuListesi);
    const activeMenu = useSelector((state) => state.activeMenu.activeMenu);
    const history = useHistory();
    const dispatch = useDispatch();

    const menuRemove = (id) => {
        dispatch(removeMenu(id));
        activeMenu ? history.push(activeMenu.link) : history.push("/");
        console.log(activeMenu);
    }


    useEffect(() => {

    }, [menuListesi])
    return (
        <div className='bg-gray-500'>
            <div>
                <ul className='flex gap-4 p-1'>
                    {
                        menuListesi.map((menu) => (
                            <li key={menu.isim} className="flex items-center justify-between w-[170px] bg-white divide-x">
                                <Link to={menu.link} className='bg-blue-200 ml-auto w-full pl-1 hover:bg-blue-400 duration-200'>{menu.isim}</Link>
                                <button
                                    onClick={() => menuRemove(menu.id)}
                                    className='bg-white px-2 hover:bg-red-600 hover:text-white'>x</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ActiveMenuList