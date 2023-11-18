import './styles.css';
import profile from '../../images/profile.png'
import createShops from '../../images/create.png'
import { Link } from 'react-router-dom';
import {Tooltip} from 'antd';
import { useSelector } from 'react-redux';

const Profile=()=>{
    const user=useSelector(state=>state);
    return (
        <div>
            <div className='user-name'>{user.name}</div>
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