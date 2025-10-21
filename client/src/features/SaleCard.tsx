
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './saleCard.css'

interface PropsType {
    profilePic?: string;
    sellerName: string;
    date: string;
    pictures?: string[]
}

const SaleCard: React.FC<PropsType> = (props:PropsType) => {

    return (
        <div className="sale-card-main">
            <div className="sale-card-info">

                {props.profilePic && <img className='profile-picture-sale' src={props.profilePic} alt='profile picture'/>}

                {!props.profilePic && <AccountCircleIcon sx={{color: 'grey', fontSize: '7vh'}} />}

                <span className='sale-info-text'>
                    <span>
                        {props.sellerName}'s Sale
                    </span><br/>
                    Started {props.date}
                </span>
                
            </div>

            <div className='sale-card-pictures'>
                {props.pictures && props.pictures.slice(0, 3).map(
                    (picture) => {
                    return <img className='sale-item-picture' src={picture} alt='item picture' />
                }
                )}
            </div>
        </div>
    )
}

export default SaleCard;