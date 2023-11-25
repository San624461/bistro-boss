import React from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed  pt-10'>
            <SectionTitle
            subHeading="check it out"
    
            heading="Featured Item"
            ></SectionTitle>
           <div className='md:flex bg-slate-500 bg-opacity-40
           justify-center items-center py-20  px-36 gap-3'>
           <div>
                <img src={featuredImg} alt="" />
            </div>
            <div className='text-left text-white'>
                <p>11.13.23</p>
                <p className='uppercase'>Where can I get some?</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae neque quae nesciunt quo, quis aliquid dolore corrupti sed nisi temporibus saepe nihil reiciendis perferendis necessitatibus et blanditiis tempore reprehenderit dolorem similique. Porro, at, sed fuga, ratione quam temporibus laudantium ipsa laborum impedit alias ullam eos quis? Delectus harum nulla explicabo!</p>
                <button className=" text-white btn btn-outline mt-2  border-0 border-b-red-200 border-b-4"> Order Now</button>
            </div>
           </div>
        </div>
    );
};

export default Featured;