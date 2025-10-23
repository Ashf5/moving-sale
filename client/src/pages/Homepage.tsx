
import SaleCard from "../features/SaleCard"
import { BASE_API_URL } from "../constants";
import type { Sale } from "../types/saleTypes";
import './homepage.css'
import { useEffect, useState } from "react";

const images = [
    "/missing-photo.jpg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5sPaRlaV3lDCDBRUxFzHx2TNUuAlLjx7t1l_fjM1f2a1h5PlVxwG_Odwtl9apO4VsRX6G7vUYyq6vmGxORjg27KemBXuEkPrjyiudymxOYMhfYZo5oJC_5il8mwghzIh3T07CY2f-X-XxG7nTRk4K_eBKXtB-LwyecN3vgYqIU0pzqMJlRrdTUNQm99b-shIWQOke2Ebd3aJwXKSNgV5MJvfVzbxBtrE7JjnBM-LfDcSrhjzcWOyQybytXUKjn9RLjG0H4E7XeA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzoqnK6bRu0Xs8VZjrd8VtNLruG12RQrCD3MSl8W3IDowy-3VOIcWoNAP9FHSBhuGcovAwzGyIJ4X7HHY9x0gnr2L1Lu6gJZh56aL3IBhKMaoidAC0jOrEvRiPHI5M7NOVLUCWhen-cEz_PWmvc6F9OAqtdz0ORvo4UTHHbDeBww90Tba4R4uQ1vDK8HDPrzQyzUD42MJOyvdvzDT6QvPjp4Lvs2A2ks-hr1yWZXNhNqjVHLTpAt6xqPHAjuaNbK_WiTh4b9EhOQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAzoqnK6bRu0Xs8VZjrd8VtNLruG12RQrCD3MSl8W3IDowy-3VOIcWoNAP9FHSBhuGcovAwzGyIJ4X7HHY9x0gnr2L1Lu6gJZh56aL3IBhKMaoidAC0jOrEvRiPHI5M7NOVLUCWhen-cEz_PWmvc6F9OAqtdz0ORvo4UTHHbDeBww90Tba4R4uQ1vDK8HDPrzQyzUD42MJOyvdvzDT6QvPjp4Lvs2A2ks-hr1yWZXNhNqjVHLTpAt6xqPHAjuaNbK_WiTh4b9EhOQ"

]

const profilePicture = 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=2048x2048&w=is&k=20&c=8QovDK9XochFpaIC-N3pn5EEaRSVuE1SKpQDVUxLSUk='


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
            {/* <SaleCard profilePic={profilePicture} sellerName="asher" date="12/12/2025" pictures={images}/> */}
            {!loading && sales.map(sale => <SaleCard profilePic={sale.profile_picture || undefined} sellerName={sale.firstname} date={sale.date_created} pictures={sale.images}/>)}
        </div>
    )
}

export default Homepage;