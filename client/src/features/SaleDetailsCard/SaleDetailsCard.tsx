import type { SaleInfo } from "../../types/saleTypes";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const SaleDetailsCard: React.FC<{props:SaleInfo}> = ({props}) => {

    return (
        <div className="sale-info-card-seller">
            <h3>Your Sale</h3>
            <p><CalendarMonthIcon /> {String(props.date_created).split('T')[0]}</p>
            <p><LocationOnIcon /> {props.address}</p>
            <p><EmailIcon /> {props.email}</p>
            <p><LocalPhoneIcon /> {props.phone}</p>
        </div>
    )

}

export default SaleDetailsCard;