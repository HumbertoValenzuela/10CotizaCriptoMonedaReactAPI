import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import useMoneda from '../hooks/useMonedas.jsx';
import useCriptomoneda from '../hooks/useCriptomoneda.js';
import Error from './Error.js';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;

  transition: background-color .3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;


const Formulario = ( { obtenerMoneda, obtenerCriptomoneda } ) => {// extraer los datos y llevarlos a App para cotizarlo

  // state, Para pasar la lista de criptomonedas
  // listacripto inicia como un Array vacio pero cuando se consulta a la API, ya tiene el select. Por lo tanto pasar la lista a useCriptomoneda
  const [listacripto, guardarListacripto] = useState( [] );

  const [error, guardarError] = useState( false );

  const monedas = [
    { codigo: 'USD', nombre: 'Dolar'},
    { codigo: 'MXN', nombre: 'Peso Mexicano'},
    { codigo: 'EUR', nombre: 'Euro'},
    { codigo: 'GBP', nombre: 'Libra Esterlina'},
  ];

  // Utilizar custom hook useMoneda.
  // el state es la moneda que se retorna en el select option
  // Notar que el nombre no importa, es el orden  
  const [ moneda, Seleccionar ] = useMoneda('Elije tu Moneda', '', monedas);

  // Utilizar useCriptomoneda
  // Primer valor 'elige tu criptomoneda
  // Valor inicial de la selección del usuario string vacio
  // 131 Pasando Criptomonedas al Custom Hook desde una API
  const [criptomoneda, SeleccionarCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)
  
  // Cuando el componente Formulario este cargado. Se quiere ejecutar la consulta a la API
  // Ejecutar llamado a la API
  useEffect(() => {
    // axios
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const resultado = await axios.get( url );

      // console.log( resultado ); //La API entrega respuesta
      // console.log( resultado.data.Data);

      // utilizar guardarListacripto, una vez que se obtenga un resultado. que es el listado de criptomonedas de la API
      guardarListacripto( resultado.data.Data );
      
    }
   
    // Llamar la función consultarAPI para que inicie
    consultarAPI();

  }, []);

  // Cuando el susuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar si ambos capos estan llenos
    if ( moneda === '' || criptomoneda === '') {
      guardarError( true );
      return;
    }

    // Pasar los datos al componente principal. El resultado se pasará a otro componente
    guardarError( false );

    // Usar los state de App.js obtenerMoneda obtenerCriptomoneda para obtener los resultados de moneda y criptomoneda
    obtenerMoneda( moneda );
    obtenerCriptomoneda ( criptomoneda );
    // Ir devtools components - App - dos state - agregar moneda y cripto - enviar - se observa que guardo los datos de los select
  };


  return ( 
    <form onSubmit={ cotizarMoneda } >

      { error ? <Error mensaje="Todos los campos son Obligatorios" /> : null }

      <Seleccionar />
      <SeleccionarCripto />
      <Boton 
        type="submit"
        value="Calcular"
      />
    </form>
   );
}
 
export default Formulario;