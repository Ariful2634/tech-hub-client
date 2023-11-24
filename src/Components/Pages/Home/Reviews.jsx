// import { useState } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';


// const Reviews = (rev) => {

//     const axiosPublic = useAxiosPublic()
//     const [review, setReview] = useState([])

//     axiosPublic.get('/reviews')
//         .then(res => {
//             setReview(res.data)
//         })
//     console.log(review.product_name)
//     console.log(rev.product_name)

//     const getReview = review.filter(view => view.product_name === rev.product_name)
//     console.log(getReview)

//     return (
//         <div>
//             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//                 {
//                     getReview.map(reviews=><SwiperSlide key={reviews._id}>
//                         <div>
//                             <img src={reviews.name} alt="" />
//                         </div>
//                     </SwiperSlide>)
//                 }
                
                
//             </Swiper>
//         </div>
//     );
// };

// export default Reviews;