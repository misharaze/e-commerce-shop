

import LightBox from './lightbox/Lightbox';
import PopularSlider from './sliderPopularProduct/SliderPopularSection'
import NewProduct from './newProduct/newProduct'
import Brands from './brands/Brands';
import News from './newsSlider/news'
import { observer } from 'mobx-react-lite';


const mainPage = observer(() => {
    return (
        <div className='mainPage'>
           
            <LightBox/>
            
            <PopularSlider />
            <NewProduct />
            <News />
            
            <Brands /> 
            
        </div>
    );
  })

export default mainPage;