
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <div>
            <div className="text-center mt-28">
                <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!!!</h1>
                <h2 className="text-4xl font-bold text-red-600">404 Page Not Found</h2>
            </div>
            <div className="text-center mt-6">
                <Link to='/'><button className="btn btn-error font-bold">Go Back</button></Link>
            </div>
        </div>
        </div>
    );
};

export default Error;