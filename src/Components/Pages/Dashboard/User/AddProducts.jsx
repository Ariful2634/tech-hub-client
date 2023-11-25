import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useState } from 'react';
// import { render } from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const AddProducts = () => {

    const [tags, setTags] = useState([])

    const { user } = useContext(AuthContext)

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const axiosPublic=useAxiosPublic()


    const handleForm = e => {
        e.preventDefault()
        const form = e.target;
        const product_name = form.productName.value;
        const product_image = form.productImage.value;
        const description = form.description.value;
        const name = form.name.value;
        const image = form.image.value;
        const email = form.email.value;
        const links = form.links.value;
        const product = { product_name, product_image, description, name, image, email, tags, links  }
        console.log(product)

        axiosPublic.post('/addProduct', product)
        .then(res => {
            if (res.data.insertedId) {
                form.reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You add product successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
   
    }

    return (
        <div>
            <div className="hero ">
                <div className="hero-content w-[420px] md:w-96 lg:w-[420px] flex-col ">

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleForm} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" placeholder="Name" name="productName" className="input input-bordered border-success" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input type="text" placeholder="Product Image" name="productImage" className="input input-bordered border-success" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea className="textarea textarea-success" placeholder="Product Description" name="description"></textarea>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" placeholder="Name" name="name" defaultValue={user?.displayName} className="input input-bordered border-success" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Image</span>
                                </label>
                                <input type="text" placeholder="Image" defaultValue={user?.photoURL} name="image" className="input input-bordered border-success" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Email</span>
                                </label>
                                <input type="email" placeholder="Email" defaultValue={user?.email} name="email" className="input input-bordered border-success" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Add Tags</span>
                                </label>
                                <ReactTags name="tags"
                                    tags={tags}
                                    
                                    delimiters={delimiters}
                                    handleDelete={handleDelete}
                                    handleAddition={handleAddition}
                                    handleDrag={handleDrag}
                                    handleTagClick={handleTagClick}
                                    inputFieldPosition="bottom"
                                    autocomplete
                                />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">External Links</span>
                                </label>
                                <input type="text" placeholder="External Links"  name="links" className="input input-bordered border-success" required />

                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;