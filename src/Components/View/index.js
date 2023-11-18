import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import deleteButton from '../../images/delete.png'
import editButton from '../../images/edit.png'
import { useState } from 'react';
import { Modal } from 'antd'
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { actions } from '../../store';
import { useNavigate, useParams, Link } from 'react-router-dom';
import create from '../../images/create.png'
import Loader from '../Loader'

const View = () => {

    const params = useParams();
    const id = parseInt(params.id);
    const [shopModal, setShopModal] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [productModalData, setProductModalData] = useState(false);

    const shops = useSelector(state => state.shops);
    const user = useSelector(state => state);
    const shop = shops[id];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading,setLoading]=useState(false);

    // console.log({ shop });

    const deleteTag=async({ productIndex='', tagIndex='' })=>{
        // console.log(productIndex,tagIndex,shop.products[productIndex].tags);
        const newTag=shop.products[productIndex].tags.split(',').filter((tag,index)=>(index!==tagIndex)).join(',');
        console.log(newTag);
        const newProduct={...shop.products[productIndex],tags:newTag};
        const newProducts = shop.products.map((product, index) => {
            if(index===productIndex){
                console.log('here');
                return newProduct;
            }
            return product;
        });
        const newShops = shops.map((shop, index) => {
            if (index === id) {
                return { ...shop, products: newProducts };
            }
            return shop;
        })
        console.log(newTag,newProduct,newProducts,newShops);
        const newUser = { ...user, shops: newShops }
        const userRef = doc(db, "shopUsers", user.id);
        await updateDoc(userRef, newUser);
        dispatch(actions.changeCurrentUser(newUser));
        setProductModal(false);
    }

    const deleteShop = async () => {
        // console.log('here');
        setLoading(true);
        const newShops = shops.filter((shop, index) => index !== id);
        const newUser = { ...user, shops: newShops }
        const userRef = doc(db, "shopUsers", user.id);
        await updateDoc(userRef, newUser);
        dispatch(actions.changeCurrentUser(newUser));
        // console.log({newUser});
        setShopModal(false);
        // console.log('here');
        navigate('/');
        setLoading(false);
    }

    const deleteProduct = async () => {
        const newProducts = shop.products.filter((product, index) => index !== productModalData);
        const newShops = shops.map((shop, index) => {
            if (index === id) {
                return { ...shop, products: newProducts };
            }
            return shop;
        })
        const newUser = { ...user, shops: newShops }
        const userRef = doc(db, "shopUsers", user.id);
        await updateDoc(userRef, newUser);
        dispatch(actions.changeCurrentUser(newUser));
        setProductModal(false);
    }

    if(loading) return <Loader />

    return (
        <div className='view'>
            <div className='view-shop'>
                <div className='shop-flex'>
                    <div className="shop-name">{shop?.name}</div>
                    <img
                        src={deleteButton}
                        alt='delete' className='shop-image-view'
                        onClick={() => setShopModal(true)} />
                </div>
                <div className="shop-about">{shop?.about}</div>
                <div className="shop-about">{shop?.address}</div>
                <div className="shop-about">{`${shop?.latitude} ${shop?.longitude}`}</div>
            </div>

            <div className='view-create'>
                <h4 className='your-products'>Your Products</h4>
                <Link to={`/addProduct/${id}`} ><img src={create} alt='add product' className='view-image' /></Link>
            </div>

            {
                <div className="product-list-container">
                    {shop.products && shop.products.length !== 0 ? (
                        shop.products.map((product, index) => (
                            <div className="product-item" key={index}>
                                <div className='shop-flex'>
                                    <div className="product-name">{product.name}</div>
                                    <div className='buttons'>
                                        <Link to={`/addProduct/${id}/${index}`}>
                                            <img
                                                src={editButton}
                                                alt='edit' className='edit-image' />
                                        </Link>
                                        <img
                                            src={deleteButton}
                                            alt='delete' className='shop-image'
                                            onClick={() => { setProductModal(true); setProductModalData(index) }} />

                                    </div>
                                </div>
                                <div className="product-description">{product.description}</div>
                                <div className="product-price">{`\u20B9${product.price}`}</div>
                                <div className="product-availability">{`Only ${product.availability || 0} pieces left`}</div>
                                <div className='tags'>{product.tags && product.tags.split(',').map((tag, ii) =>
                                    <div className="tag">{tag}
                                        <svg onClick={() => { deleteTag({ productIndex: index, tagIndex: ii });}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 80 80">
                                            <path d="M 18 8.585938 L 8.585938 18 L 30.585938 40 L 8.585938 62 L 18 71.414063 L 40 49.414063 L 62 71.414063 L 71.414063 62 L 49.414063 40 L 71.414063 18 L 62 8.585938 L 40 30.585938 Z M 18 11.414063 L 40 33.414063 L 62 11.414063 L 68.585938 18 L 46.585938 40 L 68.585938 62 L 62 68.585938 L 40 46.585938 L 18 68.585938 L 11.414063 62 L 33.414063 40 L 11.414063 18 Z M 19 15 C 18.449219 15 18 15.449219 18 16 C 18 16.550781 18.449219 17 19 17 C 19.550781 17 20 16.550781 20 16 C 20 15.449219 19.550781 15 19 15 Z M 61 15 C 60.449219 15 60 15.449219 60 16 C 60 16.550781 60.449219 17 61 17 C 61.550781 17 62 16.550781 62 16 C 62 15.449219 61.550781 15 61 15 Z M 22 18 C 21.449219 18 21 18.449219 21 19 C 21 19.550781 21.449219 20 22 20 C 22.550781 20 23 19.550781 23 19 C 23 18.449219 22.550781 18 22 18 Z M 58 18 C 57.449219 18 57 18.449219 57 19 C 57 19.550781 57.449219 20 58 20 C 58.550781 20 59 19.550781 59 19 C 59 18.449219 58.550781 18 58 18 Z M 25 21 C 24.449219 21 24 21.449219 24 22 C 24 22.550781 24.449219 23 25 23 C 25.550781 23 26 22.550781 26 22 C 26 21.449219 25.550781 21 25 21 Z M 55 21 C 54.449219 21 54 21.449219 54 22 C 54 22.550781 54.449219 23 55 23 C 55.550781 23 56 22.550781 56 22 C 56 21.449219 55.550781 21 55 21 Z M 28 24 C 27.449219 24 27 24.449219 27 25 C 27 25.550781 27.449219 26 28 26 C 28.550781 26 29 25.550781 29 25 C 29 24.449219 28.550781 24 28 24 Z M 52 24 C 51.449219 24 51 24.449219 51 25 C 51 25.550781 51.449219 26 52 26 C 52.550781 26 53 25.550781 53 25 C 53 24.449219 52.550781 24 52 24 Z M 31 27 C 30.449219 27 30 27.449219 30 28 C 30 28.550781 30.449219 29 31 29 C 31.550781 29 32 28.550781 32 28 C 32 27.449219 31.550781 27 31 27 Z M 49 27 C 48.449219 27 48 27.449219 48 28 C 48 28.550781 48.449219 29 49 29 C 49.550781 29 50 28.550781 50 28 C 50 27.449219 49.550781 27 49 27 Z M 34 30 C 33.449219 30 33 30.449219 33 31 C 33 31.550781 33.449219 32 34 32 C 34.550781 32 35 31.550781 35 31 C 35 30.449219 34.550781 30 34 30 Z M 46 30 C 45.449219 30 45 30.449219 45 31 C 45 31.550781 45.449219 32 46 32 C 46.550781 32 47 31.550781 47 31 C 47 30.449219 46.550781 30 46 30 Z M 37 33 C 36.449219 33 36 33.449219 36 34 C 36 34.550781 36.449219 35 37 35 C 37.550781 35 38 34.550781 38 34 C 38 33.449219 37.550781 33 37 33 Z M 43 33 C 42.449219 33 42 33.449219 42 34 C 42 34.550781 42.449219 35 43 35 C 43.550781 35 44 34.550781 44 34 C 44 33.449219 43.550781 33 43 33 Z M 40 36 C 39.449219 36 39 36.449219 39 37 C 39 37.550781 39.449219 38 40 38 C 40.550781 38 41 37.550781 41 37 C 41 36.449219 40.550781 36 40 36 Z M 33 43 C 32.449219 43 32 43.449219 32 44 C 32 44.550781 32.449219 45 33 45 C 33.550781 45 34 44.550781 34 44 C 34 43.449219 33.550781 43 33 43 Z M 47 43 C 46.449219 43 46 43.449219 46 44 C 46 44.550781 46.449219 45 47 45 C 47.550781 45 48 44.550781 48 44 C 48 43.449219 47.550781 43 47 43 Z M 30 46 C 29.449219 46 29 46.449219 29 47 C 29 47.550781 29.449219 48 30 48 C 30.550781 48 31 47.550781 31 47 C 31 46.449219 30.550781 46 30 46 Z M 50 46 C 49.449219 46 49 46.449219 49 47 C 49 47.550781 49.449219 48 50 48 C 50.550781 48 51 47.550781 51 47 C 51 46.449219 50.550781 46 50 46 Z M 27 49 C 26.449219 49 26 49.449219 26 50 C 26 50.550781 26.449219 51 27 51 C 27.550781 51 28 50.550781 28 50 C 28 49.449219 27.550781 49 27 49 Z M 53 49 C 52.449219 49 52 49.449219 52 50 C 52 50.550781 52.449219 51 53 51 C 53.550781 51 54 50.550781 54 50 C 54 49.449219 53.550781 49 53 49 Z M 24 52 C 23.449219 52 23 52.449219 23 53 C 23 53.550781 23.449219 54 24 54 C 24.550781 54 25 53.550781 25 53 C 25 52.449219 24.550781 52 24 52 Z M 56 52 C 55.449219 52 55 52.449219 55 53 C 55 53.550781 55.449219 54 56 54 C 56.550781 54 57 53.550781 57 53 C 57 52.449219 56.550781 52 56 52 Z M 21 55 C 20.449219 55 20 55.449219 20 56 C 20 56.550781 20.449219 57 21 57 C 21.550781 57 22 56.550781 22 56 C 22 55.449219 21.550781 55 21 55 Z M 59 55 C 58.449219 55 58 55.449219 58 56 C 58 56.550781 58.449219 57 59 57 C 59.550781 57 60 56.550781 60 56 C 60 55.449219 59.550781 55 59 55 Z M 18 58 C 17.449219 58 17 58.449219 17 59 C 17 59.550781 17.449219 60 18 60 C 18.550781 60 19 59.550781 19 59 C 19 58.449219 18.550781 58 18 58 Z M 62 58 C 61.449219 58 61 58.449219 61 59 C 61 59.550781 61.449219 60 62 60 C 62.550781 60 63 59.550781 63 59 C 63 58.449219 62.550781 58 62 58 Z M 15 61 C 14.449219 61 14 61.449219 14 62 C 14 62.550781 14.449219 63 15 63 C 15.550781 63 16 62.550781 16 62 C 16 61.449219 15.550781 61 15 61 Z M 65 61 C 64.449219 61 64 61.449219 64 62 C 64 62.550781 64.449219 63 65 63 C 65.550781 63 66 62.550781 66 62 C 66 61.449219 65.550781 61 65 61 Z"></path>
                                        </svg>
                                    </div>)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">No Products Added</div>
                    )}
                </div>
            }
            {
                shopModal && <Modal
                    onOk={deleteShop}
                    onCancel={() => setShopModal(false)}
                    visible={shopModal}
                >
                    <div>
                        Are you sure you want to delete this shop ?
                    </div>
                </Modal>
            }
            {
                productModal && <Modal
                    onOk={deleteProduct}
                    onCancel={() => setProductModal(false)}
                    visible={productModal}
                >
                    <div>
                        Are you sure you want to delete this product ?
                    </div>
                </Modal>
            }
        </div>
    );
}
export default View;
