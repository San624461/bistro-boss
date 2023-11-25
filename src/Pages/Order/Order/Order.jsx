import React, { useState } from 'react';
import orderCover from '../../../assets/shop/order.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup','desserts' ,'drinks']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    console.log(category);
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        
        <div className=''>
              <Helmet>
                <title>Bistro Boss | Order Food</title>
                {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
            </Helmet>
            <Cover
                img={orderCover}
                title='Order Food'
            ></Cover>

            <Tabs className='mt-5 mb-5' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>

                </TabList>
                <TabPanel>
                    <OrderTab
                        items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={soup}></OrderTab>
                </TabPanel>
                <TabPanel

                >
                    <OrderTab
                        items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;