import Banner from "./Banner";
import CouponSlider from "./CouponSlider";
import FeatureProduct from "./FeatureProduct";
import TrendingProduct from "./Trending/TrendingProduct";



const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeatureProduct></FeatureProduct>
           <TrendingProduct></TrendingProduct>
            <CouponSlider></CouponSlider>
        </div>
    );
};

export default Home;