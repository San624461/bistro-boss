// import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {

    const[menu]=useMenu();
    const popularItem = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([])
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems)
    //         })

    // }, [])
    return (
        <section className='mb-12'>
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            >
            </SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularItem.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
            
            <button className=" text-black btn btn-outline mt-2  border-0 border-b-red-200 border-b-4"> View Full Menu</button>
        </section>
    );
};

export default PopularMenu;