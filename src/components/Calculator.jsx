import React from 'react';

import '../assets/styles/calculator.css';

import Button from './Button';

import buttons from '../buttons';
import useCalculator from '../hooks/useCalculator';

const Calculator = () => {

    const { display, formula, result, setFormula, setDisplay, setResult, calculate } = useCalculator();

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div id="display">
                    <span>{formula}</span>
                    <span>{display}</span>
                </div>
                {buttons.map(button => (
                    <Button 
                        {...button}
                        key={button.id}
                        result={result}
                        formula={formula}
                        display={display}
                        setFormula={setFormula} 
                        setDisplay={setDisplay} 
                        setResult={setResult} 
                        calculate={calculate}
                    />
                ))}
            </div>
        </div>
    );
}

export default Calculator;