import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';



const CouponSlider = () => {

    const axiosPublic = useAxiosPublic()

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupon')
            return res.data

        }

    })

    return (
        <div>
            <Swiper  navigation={true} modules={[Navigation, Autoplay]} autoplay={true} className="mySwiper">
                {
                    coupons.map(coupon => <SwiperSlide key={coupon._id}>
                        <div className="py-16 mx-24 space-y-3 flex flex-col items-center">
                            <p className="font-bold">Coupon Code: {coupon.coupon_code}</p>
                            <p className="text-center font-bold"> Expiry Date: {coupon.expiry_date}</p>
                            <p className="font-bold">Coupon code description: {coupon.description}</p>
                            <p className="font-bold"> Discount Amount: {coupon.discount_amount}%</p>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default CouponSlider;