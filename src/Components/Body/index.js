import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import deleteButton from '../../images/delete.png'
import { useState } from 'react';
import { Modal } from 'antd'
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { actions } from '../../store';
import { Link } from 'react-router-dom';


const Body = () => {

    const shops = useSelector(state => state.shops);
    const user = useSelector(state => state);
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const dispatch = useDispatch();

    const deleteShop = async () => {
        const newShops = shops.filter((shop, index) => index !== modalData);
        const newUser = { ...user, shops: newShops }
        const userRef = doc(db, "shopUsers", user.id);
        await updateDoc(userRef, newUser);
        dispatch(actions.changeCurrentUser(newUser));
        setModal(false);
    }

    return (
        <div className="shops-container">
            <div className='shops-title'>Your Shops</div>
            {(shops&& shops.length!==0) ?shops.map((shop, index) => {
                if (shop.name && shop.name !== '') {
                    return (
                        <div key={index} className="shop-card">

                            <div className='shop-flex'>
                                <Link to={`/view/${index}`} className='link' ><div className="shop-name">{shop.name}</div></Link>
                                <img
                                    src={deleteButton}
                                    alt='delete' className='shop-image'
                                    onClick={() => { setModal(true); console.log('clicked'); setModalData(index) }} />
                            </div>
                            <Link to={`/view/${index}`} className='link' ><div className="shop-about">{shop.about}</div></Link>
                            <Link to={`/view/${index}`} className='link' ><div className="shop-adress">{shop.adress}</div></Link>
                            <Link to={`/view/${index}`} className='link' ><div className="shop-latitude">{`${shop.latitude}  ${shop.longitude}`}</div></Link>

                        </div>
                    );
                }
                return null;
            }): <div className="no-products">No Shops Added</div> }
            {
                modal && <Modal
                    onOk={deleteShop}
                    onCancel={() => { setModal(false) }}
                    visible={modal}
                >
                    <div>
                        Are you sure you want to delete this shop ?
                    </div>
                </Modal>
            }
        </div >
    );
}
export default Body;