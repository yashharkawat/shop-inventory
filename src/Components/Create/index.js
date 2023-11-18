import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";


const createSchema = yup.object().shape({
    name: yup.string().required("Enter valid name"),
    about: yup.string(),
    adress: yup.string(),
    latitude: yup.string(),
    longitude: yup.string(),
});

const Create = () => {
    const user = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createShop = async (values) => {
        try {
            const userRef = doc(db, "shopUsers", user.id);
            const shops = [...user.shops, values];

            const newUser = { ...user, shops };
            await updateDoc(userRef, newUser);
            dispatch(actions.changeCurrentUser(newUser));
            // console.log({ newUser });
            navigate("/");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Create new shop</h2>
            <Formik
                initialValues={{ about: "", latitude: "", name: "", longitude: "", adress: "" }}
                validationSchema={createSchema}
                onSubmit={(values) => {
                    createShop(values);
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
                            placeholder="Enter shop name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />
                        {touched.name && errors.name && (
                            <div className="error">{errors.name}</div>
                        )}
                        <input
                            name="about"
                            type="text"
                            placeholder="Enter details about shop"
                            value={values.about}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="adress"
                            type="text"
                            placeholder="Enter shop adress"
                            value={values.adress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="latitude"
                            type="text"
                            placeholder="Enter shop latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />

                        <input
                            name="longitude"
                            type="text"
                            placeholder="Enter shop longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input"
                        />
                        <button type="submit" className="login-button">
                            Create shop
                        </button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default Create;
