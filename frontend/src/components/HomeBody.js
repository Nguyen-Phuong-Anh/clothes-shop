import DetailCard from '../components/Card';
import image3 from '../images/clothes3.jpg'
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';

function HomeBody() {
    return (
        <div>
            <div className='container'><Slider/></div>
            <div className='body'>
                <div>
                    <ul>
                        <li>jfalsf</li>
                        <li>jfalsf</li>
                        <li>jfalsf</li>
                        <li>jfalsfﾞ</li>
                    </ul>
                </div>
                <div className='card_group'>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                    <DetailCard image={image3}/>
                </div>
            </div>
        </div>
    );
}

export default HomeBody;