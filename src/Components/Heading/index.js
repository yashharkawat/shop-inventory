import './styles.css';
import profile from '../../images/profile.png'
import createShops from '../../images/create.png'
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../images/logout.png'
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { actions } from "../../store";

const Profile = () => {
    const user = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const logoutHandler = async () => {
        try {
            dispatch(actions.changeCurrentUser("reset"));
            // console.log({user});
            await signOut(auth);
            //console.log('hi');
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className='profile-flex'>
                <div className='user-name'>{user.name}</div>
                <img src={logout} alt='logout' className='logout-image' onClick={logoutHandler} />
            </div>
            <div className='user-phone'>{user.phone}</div>
            <div className='user-email'>{user.email}</div>

        </div>
    );
}
const Heading = () => {
    return (
        <div className="heading">
            <div className='heading-title'>Shop Inventory</div>
            <div className='images'>
                <Tooltip title={<Profile />} placement='bottom'><img src={profile} alt='Profile' className='image' /></Tooltip>
                <Link to='/create'><img src={createShops} alt='Create shops' className='image' /></Link>
            </div>
        </div>
    );
}
export default Heading;