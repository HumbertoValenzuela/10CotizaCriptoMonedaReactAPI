import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
// Importar imagen en create-react-app
import imagen from './criptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`

  max-width: 900px;
  margin: 0 auto;

  @media ( min-width: 992px ) {
    display: grid;
    grid-template-columns: repeat( 2, 1fr );
    column-gap: 2rem;
  }

`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;  
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100%;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    left: 50%;
  }
`;
function App() {

  // 135 Pasando los valores a cotizar a un Effect
  // Obtener los valores moneda y criptomoneda para cotizarlo. Para obtenerlo pasarlo al components Formulario
  const [moneda, obtenerMoneda] = useState('');
  const [criptomoneda, obtenerCriptomoneda] = useState('');
  const [resultado , guardarResultado ] = useState( {} );
  // Spinner
  const [cargando, setCargando] = useState(false);

  //Con los valores se hará el calculo de cotizar. useEffect porque va a cambiar los valores. useEffect puede recargar
  useEffect( () => {
    //Dentro de useEffect. Se recomienda crear una función y luego llamarla

    // console.log('cotizando');
    const cotizarCriptomoneda = async () => {
      
      // Prevenir la primera ejecución
      if (moneda === '') return;

      // consultar la api para obtener la cotizacion
      const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);


      // mostrar el Spinner
      setCargando( true );

      setTimeout(() => {
        
        // Cambiar el estado de spinner de cargando
        setCargando( false );

        // console.log(resultado);
        // data: DISPLAY: {BTC: {…}} RAW: BTC:
        // data: DISPLAY: {USDT: {…}} RAW: USDT:
  
        // Notar que la respuesta de la API esta cambiando por la moneda y y criptomoneda. BTC y USDT. se tiene que llamar dinamicamente
  
        // console.log(resultado.data.DISPLAY);
        // DOGE: USD:      BTC:  MXN
  
        // console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);

    }

   

    cotizarCriptomoneda();
  }, [moneda, criptomoneda])


  // Mostrar spinner o resultado
  const componente = ( cargando ) ? <Spinner /> : <Cotizacion resultado={ resultado } />

  return (
    <Contenedor>
      <div>
        <Imagen src={ imagen } alt="Criptomonedas" />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas
        </Heading>

        <Formulario 
          obtenerMoneda={ obtenerMoneda }
          obtenerCriptomoneda={ obtenerCriptomoneda }
        />

        { componente }
        {/* <Cotizacion resultado={ resultado } /> */}
      </div>
    </Contenedor>
  );
}

export default App;
