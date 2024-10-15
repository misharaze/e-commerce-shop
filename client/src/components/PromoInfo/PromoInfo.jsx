import {Card} from 'react-bootstrap'



const PromoInfo = () => {
    return ( 

 <Card  style={{'width': '100%', height:50, backgroundColor:'#808000', marginTop:10, WebkitBoxShadow: '-12px, 1px, 32px,  1px, #58FF78 ', 
boxShadow: '-12px 1px 32px 1px #58FF78 ' }}>


<div className="promo">

<div style={{justifyContent:'center',display:'flex'}} className='info'>

  <span style={{color:'yellow', fontSize:15, textDecoration:'underline'}}>En rentrant Le code WELCOME NATURALIA vous pouvez obtenir 20% de réduction sur tout le magasin </span>
</div>


</div>

</Card>



     );
}
 
export default PromoInfo;