import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useEffect ,useState} from "react";

const createSchema = yup.object().shape({
    name: yup.string().required("Enter valid name"),
    description: yup.string(),
    price: yup.string(),
    tags: yup.string(),
    availability: yup.string(),
});

const AddProduct = () => {
    const user = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params=useParams();
    const id=parseInt(params.id);
    let productId=params.productId;

    const  initialValues=(productId ? user.shops[id].products[parseInt(productId)]: { description: "", price: "", name: "", tags: "", availability: "" });

    const createProduct = async (values) => {
        try {
            // console.log({values});
            const userRef = doc(db, "shopUsers", user.id);
            const shop=user.shops[id];
            let newShop={...shop};
            if(shop.products){
                if(productId){
                    const newProducts=shop.products.map((product,ii)=>{
                        if(ii===parseInt(productId)){
                            return values;
                        }
                        else{
                            return product;
                        }
                    })
                    newShop.products=newProducts;
                }
                else newShop.products=[...newShop.products,values];
            }
            else{
                newShop.products=[values]
            }
            const shops=user.shops.map((shop,index)=>{
                if(index===id){
                    return newShop;
                }
                return shop;
            })
            // console.log({shops});
            const newUser = { ...user, shops };
            await updateDoc(userRef, newUser);
            dispatch(actions.changeCurrentUser(newUser));
            // console.log({ newUser });
            navigate(`/view/${id}`);

        } catch (err) {
            console.log(err);
        } 
        
    };

    return (
        <div className="container">
            <h2 className="title">Add new product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={createSchema}
                onSubmit={(values) => {
                    createProduct(values);
                }}
            >
                {({
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                }) => (
                    <form noValidate onSubmit={handleSubmit} className="form">
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter product name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />
                        {touched.name && errors.name && (
                            <div className="error">{errors.name}</div>
                        )}
                        <input
                            name="description"
                            type="text"
                            placeholder="Enter description of product"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="price"
                            type="text"
                            placeholder="Enter product price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="availability"
                            type="text"
                            placeholder="Enter product availability"
                            value={values.availability}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="tags"
                            type="text"
                            placeholder="Enter product tags"
                            value={values.tags}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />
                        <div className="create-tags">Enter Comma separated tags</div>
                        <button type="submit" className="login-button">
                            Create product
                        </button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default AddProduct;
