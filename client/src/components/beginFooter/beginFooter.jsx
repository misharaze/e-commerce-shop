import {CiDeliveryTruck} from 'react-icons/ci'
import {BsCartCheck} from 'react-icons/bs'
import {FaThLarge} from 'react-icons/fa'
import {BsFillHouseHeartFill} from 'react-icons/bs'
import {Card} from 'react-bootstrap'
import './beginFooter.css'

const Beginfooter = () => {
    
    return (  
<Card   style={{'width': '100%', height:100, backgroundColor:'rgb(128,128,0)', marginTop:60, WebkitBoxShadow: '-12px, 1px, 32px,  1px, #58FF78 ', 
boxShadow: '-12px 1px 32px 1px #58FF78 ' }}>

<div className="wrapper">

<div style={{display:'flex', flexDirection:'column'}}>
<CiDeliveryTruck style={{ width: 40, height: 40}}/>
<span className="title-footer">livraison-express</span>
</div>

<div style={{display:'flex', flexDirection:'column'}}>
<BsCartCheck style={{ width: 40, height: 40}}/>
<span className="title-footer">paiement en ligne disponible </span>
</div>

<div style={{display:'flex', flexDirection:'column'}}>
<FaThLarge style={{ width: 40, height: 40}}/>
<span className="title-footer">grand choix de produits</span>
</div>

<div style={{display:'flex', flexDirection:'column'}}>
<BsFillHouseHeartFill style={{ width: 40, height: 40}}/>
<span className="title-footer"> tous les jours à votre service </span>

     </div>
</div>
</Card>

    );
}
 
export default Beginfooter;