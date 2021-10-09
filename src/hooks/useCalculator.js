import { useState } from 'react';

const useCalculator = () => {

    const [ formula, setFormula ] = useState('');
    const [ display, setDisplay ] = useState('0');
    const [ result, setResult ] = useState(null);

    const pickAndSplit = (expression, sign) => {
        const regex = new RegExp(`-*[\\d|.]+[${sign}]-*[\\d|.]+`);
        const operation = expression.match(regex)[0];
        const splitted1 = Number(operation.split(sign)[0]);
        const splitted2 = Number(operation.split(sign)[1]);

        return sign === '-' ? [operation, regex] : [splitted1, splitted2, regex];
    }

    const calculate = (e, expression = formula) => {

        if(/^[+/⋅]|[+/⋅-]$/.test(expression)) {
            setFormula(expression.replace(/^[+/⋅]|[+/⋅-]$/g, '') + '=' + expression.replace(/^[+/⋅]|[+/⋅-]$/g, ''));
            setDisplay(expression.replace(/^[+/⋅]|[+/⋅-]$/g, ''));
            setResult(expression.replace(/^[+/⋅]|[+/⋅-]$/g, ''));
            return expression;
        }

        if (!/[\d|.|-]+[+/⋅-][\d|.|-]+/.test(expression)) {
            setFormula(prev => prev + '=' + expression);
            setDisplay(expression);
            setResult(expression);
            return expression;
        }

        if (expression.includes('⋅')) {
            const [a, b, regex] = pickAndSplit(expression, '⋅');
            const product = a * b;
            return calculate(e, expression.replace(regex, product));

        } else if (expression.includes('/')) {
            const [a, b, regex] = pickAndSplit(expression, '/');
            const quotient = a / b;
            return calculate(e, expression.replace(regex, quotient));

        } else if (expression.includes('+')) {
            const [a, b, regex] = pickAndSplit(expression, '+');
            const sum = a + b;
            return calculate(e, expression.replace(regex, sum));

        } else if (expression.includes('-')) {
            const [operation, regex] = pickAndSplit(expression, '-');
            const a = Number(operation.replace('-', '+').split('+')[0]);
            const b = Number(operation.replace('-', '+').split('+')[1]);
            const difference = a - b;

            return calculate(e, expression.replace(regex, difference));
        }
    }

    return {
        formula, display, result,
        setFormula, setDisplay, setResult, calculate
    };
}

export default useCalculator;
