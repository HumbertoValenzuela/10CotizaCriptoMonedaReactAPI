import React, {  Fragment, useState } from 'react';
import styled from '@emotion/styled';
// https://min-api.cryptocompare.com/documentation
// https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalMktCapEndpointFull
// Toplist by Market Cap Full Data
// https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {

  //console.log(opciones); // inicia con un arreglo vacio, luego se consulta a la API y obtiene la lista de criptomonedas

  // en devtools-components Formulario - Moneda - Criptomoneda
  // Al usar los select los hook son llenados con los valores
  
  // state del custom hook useMoneda
  const [state, setState] = useState( stateInicial );

  // Función que imprime en pantalla
  const SeleccionarCripto = () => (
    <Fragment>
      <Label> {label} </Label>
        <Select
        id={label}
        // chrome-components- Formulario - se agrega Seleccionar y el hook Moneda el state cambiará al seleccionar otra opción del select
        onChange={ e => setState( e.target.value ) }
        // Cuando el usuario selecciona otra opción. Se mantiene seleccionado
        value={state}
        onBlur={ e => setState( e.target.value ) }
        // disabled={ !opciones.length }
        >   
          <option value="">- Seleccione -</option>     
          {
            opciones.map( opcion => (
              <option 
                key={opcion.CoinInfo.Id} 
                value={opcion.CoinInfo.Name}//de 3 digitos
              >{opcion.CoinInfo.FullName}
              </option>
            ))
          }
        </Select>
    
    </Fragment>
    
  );

  // Retornar state, interfaz y fn que modifica el state  
  return [state, SeleccionarCripto, setState];
}
 
export default useCriptomoneda;