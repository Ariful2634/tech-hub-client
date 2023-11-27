

const ReportedContents = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                         
                            <th>Product Name</th>
                            <th>View Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                        
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedContents;