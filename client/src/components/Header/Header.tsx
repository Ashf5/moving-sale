
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import './header.css';

const Header:React.FC<{message:string}> = (props) => {
    return (
        <div className='header-container'>
            <p className='logo'>BuyIt</p>
            <h1 className='header-text'>{props.message}</h1>
            <a className='header-icon'><PersonOutlineOutlinedIcon /></a>
        </div>
    )
}

export default Header;