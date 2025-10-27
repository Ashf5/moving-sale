import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import type { SaleInfo } from "../types/saleTypes";
import { BASE_API_URL } from "../constants";
import SaleDetailsCard from "../features/SaleDetailsCard/SaleDetailsCard";


import './salepage.css'
import WideButton from "../components/WideButton/WideButton";



const SalePage: React.FC = () => {
    const {accessToken} = useAuth();
    const [sale, setSale] = useState<SaleInfo>();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Get Sale Details
        const fetchData = async () => {
            setLoading(true)
            const listData = await fetch(BASE_API_URL + '/my-sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    auth: accessToken
                })
            });

            try {
                const parsed = await listData.json();
                if (parsed.id) {
                    setSale({id:parsed.id, date_created: parsed.date_created, address: parsed.address, phone: parsed.phone, email: parsed.email})
                }
                
            }
            catch (e) {
                setLoading(false);
                return;
            }
                
            setLoading(false)
        }
        fetchData();
    }, [accessToken,])

    return (
        <div className="main-salepage">
            {!accessToken && <div className="sale-info-card-seller">You must be signed in <Link to={'/login'}>Login</Link></div>}

            {loading && <div>Loading....</div>}

            {sale && <>
            
            <SaleDetailsCard props={sale} />
            <WideButton text='Manage Sale' handler={() => {}}/><br />
                <WideButton text="Delete Sale" classes={['warning']}/>
            </>}

            {accessToken && !sale && <WideButton classes={['new-sale']} text="Start New Sale"/> }
        </div>
        
    )
}

export default SalePage;