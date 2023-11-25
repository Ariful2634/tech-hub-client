import { WithContext as ReactTags } from 'react-tag-input';
import Swal from "sweetalert2";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const UpdateMyProduct = () => {

    const [tags, setTags] = useState([])

    const updates = useLoaderData()
    const {id}=useParams()
    const update = updates.find(updates=>updates._id==id)
    console.log(update)
    const {_id}=update

    

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
        // setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const axiosSecure = useAxiosSecure()

    const handleForm = e => {
        e.preventDefault()
        const form = e.target;
        const product_name = form.productName.value;
        const product_image = form.productImage.value;
        const description = form.description.value;
        const links = form.links.value;
        const product = { product_name, product_image, description,  tags, links  }
        console.log(product)

        axiosSecure.put(`/update/${_id}`, product)
        .then(res => {
            if (res.data.modifiedCount > 0) {
                form.reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: " Product updated successfully",
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
                                <input type="text" placeholder="Name" name="productName" className="input input-bordered border-success"  />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input type="text" placeholder="Product Image" name="productImage" className="input input-bordered border-success"  />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea className="textarea textarea-success" placeholder="Product Description" name="description"></textarea>

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
                                <input type="text" placeholder="External Links"  name="links" className="input input-bordered border-success" />

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

export default UpdateMyProduct;