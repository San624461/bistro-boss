import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import PopularMenu from "./PopularMenu/PopularMenu";
import Testimonials from "./Testimonials/Testimonials";


const Home = () => {
    const{a,b} ={x:2,y:3}
    console.log(a,b);
    return (
        <div className="">
            <Helmet>
                <title>Bistro Boss | Home</title>
                {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
            </Helmet>
            {/* <h2>This is Home</h2> */}
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;