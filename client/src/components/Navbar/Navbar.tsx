
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import './navbar.css'
import { Link } from 'react-router-dom';

const Navbar:React.FC = () => {

    return (
        <div className="navbar">
            <Link to={'/'} className="navbar-option">
                <HomeOutlinedIcon />
                <br />Home
            </Link>

             <a className="navbar-option">
                <FavoriteBorderOutlinedIcon /><br />
                Wishlist
            </a>

             <a className="navbar-option">
                <ControlPointOutlinedIcon />
                <br />Sell
            </a>

             <a className="navbar-option">
                <PersonOutlineOutlinedIcon />
                <br />Account
            </a>

        </div>
    )
}

export default Navbar;