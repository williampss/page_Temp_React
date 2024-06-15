import './clima.css';
import {} from '../../App'
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { LuText } from 'react-icons/lu';

export function CardSemana(props){
  return(
       <div className='Card_temp'>
        <p className='textCard'>{props.diaSemana}</p>
        <p className='textCard'><FaTemperatureHigh/>{props.temperatura}C°</p>
        <p className='textCard'><LuText />{props.descricao}</p>  
       </div>
  )
}
export default CardSemana;