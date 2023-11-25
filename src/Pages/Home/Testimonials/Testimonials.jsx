import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import { Rating } from '@smastrom/react-rating';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {

        fetch('https://bistro-boss-server-six-steel.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    })
    return (
        <section className='my-20'>

            <SectionTitle
                subHeading="What Our Client Say"
                heading={'Testimonials'}></SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}>

                        <div className=''>

                            <Rating
                            className='w-[50%] mx-auto'
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className='w-[80%] mx-auto'>{review.details}</p>
                            <h3 className='text-3xl text-orange-npm i @smastrom/react-rating400'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </section>
    );
};

export default Testimonials;