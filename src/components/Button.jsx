import React from 'react';

import '../assets/styles/button.css';

import useButton from '../hooks/useButton';

const Button = ({ id, extraClasses, value, calculate, formula, display, setFormula, setDisplay, result, setResult }) => {

    const handleClick = useButton(formula, display, setFormula, setDisplay, result, setResult, calculate, value);

    return (
        <button 
            className={`button${extraClasses}`} 
            id={id} 
            value={value}
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

export default Button;
