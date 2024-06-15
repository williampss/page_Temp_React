import React, { useState, useEffect } from 'react';
import './App.css';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { LuLocateFixed, LuText } from 'react-icons/lu';
import CityImage from './components/image/undraw_Mobile_user_re_xta4-removebg-preview.png';
import CardSemana from './components/clima/cardTemp';

function App() {
  const [stateTemp, setStateTemp] = useState(0);
  const [stateDescription, setStateDescription] = useState("Descrição");
  const [stateWind, setStateWind] = useState(0);
  const [cidade, setCidade] = useState("");
  const [forecastData, setForecastData] = useState([]);

  const apiKey = 'f99304c622259877b6a126e5fe74deba';

  const callApi = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&lang=pt_br&units=metric&appid=f99304c622259877b6a126e5fe74deba`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       
        const nextDaysForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        setForecastData(nextDaysForecast);
   
        if (nextDaysForecast.length > 0) {
          setStateDescription(nextDaysForecast[0].weather[0].description);
          setStateWind(nextDaysForecast[0].wind.speed);
          setStateTemp(nextDaysForecast[0].main.temp);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da previsão:', error);
        alert('LOCAL NÃO ENCONTRADO, TENTE NOVAMENTE 😴');
      });
  };

  const handleInputChange = (event) => {
    setCidade(event.target.value);
  };

  // Lembrar que essa é  a Função para obter o nome do dia da semana
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  useEffect(() => {
    // Chamada inicial para carregar os dados da previsão
    callApi();
  }, []); // Executar somente uma vez ao carregar o componente

  return (
    <div className="App">
      <img src={CityImage} alt="City" />
      <div className='container'>
        <div className='inserir'>
          <input type='text' onChange={handleInputChange} placeholder="Digite o nome da cidade" />
        </div>
        <button onClick={callApi}>Pesquisar</button>
        <div className='boxHigh'>
          <p><LuLocateFixed /> {cidade}</p>
          <p><FaTemperatureHigh /> {stateTemp}</p>
        </div>
        <div className='boxDown'>
          <p><LuText /> {stateDescription}</p>
          <p><FaWind /> {stateWind} km/h</p>
        </div>
        <div className='Card'>
        
          {forecastData.map((item, index) => (
            <CardSemana
              key={index}
              descricao={item.weather[0].description}
              temperatura={item.main.temp}
              diaSemana={getDayOfWeek(item.dt_txt)} // Passar o nome do dia da semana para o componente
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;