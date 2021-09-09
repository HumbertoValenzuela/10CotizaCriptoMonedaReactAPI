import React, {  Fragment, useState } from 'react';
import styled from '@emotion/styled';

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

const useMoneda = (label, stateInicial, opciones) => {

  // state del custom hook useMoneda
  const [state, setState] = useState( stateInicial );

  // Función que imprime en pantalla
  const Seleccionar = () => (
    <Fragment>
      <Label> {label} </Label>
        <Select
        id={label}
        // chrome-components- Formulario - se agrega Seleccionar y el hook Moneda el state cambiará al seleccionar otra opción del select
        onChange={ e => setState( e.target.value ) }
        // Cuando el usuario selecciona otra opción. Se mantiene seleccionado
        value={state}
        onBlur={ e => setState( e.target.value ) }
        disabled={ !opciones.length }
        >   
          <option value="">- Seleccione -</option>     
          {
            opciones.map( opcion => (
              <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
            ))
          }
        </Select>
    
    </Fragment>
    
  );

  // Retornar state, interfaz y fn que modifica el state  
  return [state, Seleccionar, setState];
}
 
export default useMoneda;