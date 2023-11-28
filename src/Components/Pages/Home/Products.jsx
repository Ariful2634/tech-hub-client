import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 20;
    const status = "accept";

    const {refetch, data: products = [] } = useQuery({
        queryKey: ["product", { page, pageSize, search }],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/addProduct?search=${search}&page=${page}&pageSize=${pageSize}`
            );
            return res.data;
        }
    });

    const product = products.filter((pro) => pro.status === status);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
        setPage(1); // Reset to the first page when searching
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (product.length === pageSize) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="text-center mt-6">
                <input
                    type="text"
                    name="search"
                    placeholder="Search here"
                    className="input input-bordered input-primary w-full max-w-xs"
                />
                <input type="submit" value="Search" className="btn" />
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.map(prod => (
                    <Product key={prod._id} prod={prod} refetch={refetch}></Product>
                ))}

            </div>
            <div className="pagination">
                <button className="btn btn-circle btn-outline btn-secondary mr-2 mt-4" onClick={handlePrev} disabled={page === 1}>
                    Prev
                </button>
                <span>{`Page ${page}`}</span>
                <button className="btn btn-circle btn-outline btn-secondary ml-2 mt-4" onClick={handleNext} disabled={product.length < pageSize}>
                    Next
                </button>
            </div>


        </div>
    );
};

export default Products;
