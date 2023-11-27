import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Product from "./Product";


const Products = () => {

    const axiosSecure = useAxiosSecure()
    const [products, setProducts]=useState([])
    // const [asc,setAsc]=useState(true)
    const status = 'accept'

    axiosSecure.get('/addProduct')
    .then(res=>{
        setProducts(res.data)
    })
    console.log(products)

    const product = products.filter(pro=>pro.status==status)
    console.log(product)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    product.map(prod=><Product key={prod._id} prod={prod}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;