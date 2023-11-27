/* eslint-disable react/prop-types */


const Product = ({prod}) => {

    const {  product_image, product_name, tags, timestamp } = prod

    return (
        <div>
            <div className="border ml-16 md:ml-10 lg:ml-0 mt-8 border-purple-200 p-4 w-[300px] rounded-lg">
                <div className="flex justify-center">
                    <img className="h-[200px]" src={product_image} alt="" />
                </div>
                <div className="font-bold mt-6 space-y-2">
                    <h2><span className="text-blue-600 italic">Name:</span> {product_name}</h2>
                    <p><span className="italic text-green-600">Tags:</span> #{tags}</p>
                    <p>{timestamp}</p>
                </div>
                <div className="text-center mt-4">
                    <button className="btn font-bold w-full bg-gradient-to-r from-pink-500 to-pink-300">Upvote</button>
                </div>
            </div>
        </div>
    );
};

export default Product;