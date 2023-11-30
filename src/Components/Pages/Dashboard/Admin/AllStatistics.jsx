// import { useEffect, useState } from "react";
// import Statistics from "./Statistics";


// const AllStatistics = () => {
    

//     const [statistics, setStatistics] = useState({
//         products: 0,
//         reviews: 0,
//         users: 0,
//       });

//       useEffect(() => {
//         // Replace with actual API endpoints for your backend
//         const fetchStatistics = async () => {
//           try {
//             const productsResponse = await fetch('/addProduct/count');
//             const productsData = await productsResponse.json();
    
//             const reviewsResponse = await fetch('/reviews/count');
//             const reviewsData = await reviewsResponse.json();
    
//             const usersResponse = await fetch('/users/count');
//             const usersData = await usersResponse.json();
    
//             setStatistics({
//               products: productsData.productCount || 0,
//               reviews: reviewsData.reviewCount || 0,
//               users: usersData.userCount || 0,
//             });
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchStatistics();
//       }, []);

//     //   const labels = useState([])

//       const chartData = {
//         labels: ['Products', 'Reviews', 'Users'],
//         datasets: [
//           {
//             data: [statistics.products, statistics.reviews, statistics.users],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//             hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//           },
//         ],
//       };

//       console.log('chartData:', chartData);


//     return (
//         <div>
//             <Statistics data={chartData}></Statistics>
//         </div>
//     );
// };

// export default AllStatistics;