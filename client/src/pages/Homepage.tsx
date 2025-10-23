
import SaleCard from "../features/SaleCard/SaleCard"
import { BASE_API_URL } from "../constants";
import type { Sale } from "../types/saleTypes";
import './homepage.css'
import { useEffect, useState } from "react";



const Homepage:React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            const data = await fetch(BASE_API_URL + '/sales', {credentials: 'include'});
            const jsonData = await data.json();
            setSales(jsonData.sales);
            setLoading(false);
        }

        fetchSales();
    }, [])

    return (
        <div className="homepage-main">
            {loading && <h3>Loading.....</h3>}
            {!loading && sales.map(sale => <SaleCard key={sale.id} profilePic={sale.profile_picture || undefined} sellerName={sale.firstname} date={sale.date_created} pictures={sale.images}/>)}
        </div>
    )
}

export default Homepage;