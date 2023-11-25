import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import img1 from '../../../assets/menu/dessert-bg.jpeg'
import img2 from '../../../assets/menu/pizza-bg.jpg'
import img3 from '../../../assets/menu/salad-bg.jpg'
import img4 from '../../../assets/menu/soup-bg.jpg'
// import img4 from '../../../assets/menu'
import { useMatch } from 'react-router-dom';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
// import PopularMenu from '../../Home/PopularMenu/PopularMenu';
const Menu = () => {

    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
                {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
            </Helmet>
            <Cover
                img={menuImg}
                title='Our Menu'></Cover>
            {/* main cover */}
            <SectionTitle
                subHeading="Don't Miss"
                heading="Today's Offer"></SectionTitle>
            {/* OFFERED Menu ITEMs */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}
            <MenuCategory
                items={desserts}
                title="desserts"
                img={img1}
            ></MenuCategory>

            {/* pizza */}

            <MenuCategory items={pizza} title={"pizza"} img={img2}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} img={img3}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} img={img4}></MenuCategory>
            <MenuCategory items={drinks} title={"drinks"} img={img4}></MenuCategory>
            {/* <Cover
                img={img1}
                title='Our Menu'></Cover>
            {/* <PopularMenu></PopularMenu> */}
            {/* <Cover
                img={img2}
                title='Our Menu'></Cover>
            <PopularMenu></PopularMenu> */}
        </div>
    );
};

export default Menu;