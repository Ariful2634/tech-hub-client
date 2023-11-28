import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductReviewQueue = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const { refetch, data: products = [] } = useQuery({
        queryKey: ['users', { page, pageSize }],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addProduct?page=${page}&pageSize=${pageSize}`);
            return res.data;
        }
    });

    const sortedProducts = [...products].sort((a, b) => {
        // "Pending" status will come first, then others in alphabetical order
        if (a.status === 'Pending' && b.status !== 'Pending') return -1;
        if (a.status !== 'Pending' && b.status === 'Pending') return 1;
        return a.status.localeCompare(b.status);
    });

    const handleFeatured = (id) => {
        const featured = { mark: 'featured' };
        axiosSecure.put(`/addProduct/mark/${id}`, featured)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Congratulations',
                        `${featured.product_name} Successfully added to the featured product`,
                        'success'
                    );
                }
                refetch();
            });
    };

    const handleAccept = (id) => {
        const accepted = { status: 'accept' };
        axiosSecure.put(`/addProduct/status/${id}`, accepted)
            .then(res => {
                console.log(res.data)
                refetch();
            });
    };

    const handleReject = (id) => {
        const rejected = { status: 'reject' };
        axiosSecure.put(`/addProduct/status/${id}`, rejected)
            .then(res => {
                console.log(res.data)
                refetch();
            });
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    return (
        <div>
            <div className="overflow-x-auto flex lg:flex-row flex-col">
                <table className="table table-zebra flex lg:flex-row flex-col">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Featured</th>
                            <th>Accept</th>
                            <th>Reject</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedProducts.map(product => <tr key={product._id}>
                                <td>{product.product_name}</td>
                                <td> <Link to={`/featureDetails/${product._id}`}><button className="btn btn-accent">View Details</button></Link> </td>
                                <td>
                                    {
                                        product.mark === 'featured' ? <button  className="btn btn-accent " disabled>Featured</button> :
                                        <button onClick={() => handleFeatured(product._id)} className="btn btn-accent bg-gradient-to-r from-cyan-500 to-blue-500">Featured</button>
                                    }
                                    </td>
                                <td>
                                    {
                                        product.status === 'accept' ? <button className="btn btn-accent " disabled>Accept</button> :
                                            <button onClick={() => handleAccept(product._id)} className="btn rounded-2xl font-bold bg-gradient-to-r from-yellow-500 to-green-500">Accept</button>
                                    }
                                </td>
                                <td>
                                    {
                                        product.status === 'reject' ? <button className="btn btn-accent " disabled>Reject</button> :
                                            <button onClick={() => handleReject(product._id)} className="btn bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-2xl">Reject</button>

                                    }
                                </td>

                                {
                                    product.status === 'Pending' ? <td>{product.status}</td> :
                                        <td> {product.status === 'accept' && "Accepted"}
                                            {product.status === 'reject' && "Rejected"}
                                            {product.status === 'reported' && "Reported"}

                                        </td>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="btn btn-circle btn-primary btn-outline mt-6 mr-3 " onClick={handlePrev} disabled={page === 1}>
                    Prev
                </button>
                <span>{`Page ${page}`}</span>
                <button className="btn btn-circle btn-accent btn-outline mt-6 ml-3" onClick={handleNext} disabled={products.length < pageSize}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductReviewQueue;
