import React from 'react';
import { BlockTypes } from './../blocks/BlockTypes';

const styles = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '1px solid black',
    boxSizing: 'border-box',
};

const Cube = (props) => {
    return (  
        <div className="cube" style={{
            ...styles,
            backgroundColor: props.id > 0 ? BlockTypes[props.id].color : '#f5f5f5'}} />
    );
}

export default Cube;