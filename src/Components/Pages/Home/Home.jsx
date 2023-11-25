import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import TrendingProduct from "./Trending/TrendingProduct";



const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeatureProduct></FeatureProduct>
           <TrendingProduct></TrendingProduct>

        </div>
    );
};

export default Home;