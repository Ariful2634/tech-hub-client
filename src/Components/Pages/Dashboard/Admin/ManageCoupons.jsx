import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ManageCoupons = () => {


    const axiosSecure = useAxiosSecure()

    const handleCoupon = e => {
        e.preventDefault()
        const form = e.target;
        const coupon_code = form.code.value;
        const expiry_date = form.expiry.value;
        const description = form.description.value;
        const discount_amount = form.amount.value;
        const amount = parseInt(discount_amount)
        const coupon = { coupon_code, expiry_date, description,amount }
        console.log(coupon)

        axiosSecure.post('/coupon', coupon)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Coupon added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })

    }

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon')
            return res.data

        }

    })
    // refetch()

    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coupon Code</th>
                                <th>Expiry Date</th>
                                <th>Coupon code description</th>
                                <th>Discount Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                coupons.map((coupon,i)=><tr key={coupon._id}>
                                    
                                    <th>{i+1}</th>
                                    <td>{coupon.coupon_code}</td>
                                    <td>{coupon.expiry_date}</td>
                                    <td>{coupon.description}</td>
                                    <td>{coupon.discount_amount}%</td>
                                </tr>)
                            }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div className="hero min-h-screen mt-10">
                    <div className="hero-content flex-col lg:flex-row-reverse">

                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleCoupon} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Coupon Code</span>
                                    </label>
                                    <input type="text" name="code" placeholder="Coupon Code" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Expiry Date</span>
                                    </label>
                                    <input type="date" name="expiry" placeholder="Expiry Date" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Coupon code description</span>
                                    </label>
                                    <input type="text" name="description" placeholder="Coupon code description" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Discount Amount</span>
                                    </label>
                                    <input type="text" name="amount" placeholder="Discount Amount" className="input input-bordered" required />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn font-bold bg-gradient-to-r from-red-600 to-yellow-300 ">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCoupons;