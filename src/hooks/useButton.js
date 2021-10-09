const useButton = (formula, display, setFormula, setDisplay, result, setResult, calculate, value ) => {

    const handleClick = (e) => {
        if (/[+|⋅|/|.]{2,}|[-]{3,}|^[-]{2,}/.test(formula + e.target.value.replace('x', '⋅'))) return;
        if ((display + e.target.value).length > 20 || formula.length > 28) {
            if (display === 'DIGIT LIMIT MET') return;
            const before = display;
            setDisplay('DIGIT LIMIT MET');
            setTimeout(() => {
                setDisplay(before);
            }, 1000);
            return;
        }

        setFormula(prev => {
            if (result && /[x|/|+|-]/.test(e.target.value)) {
                return result + e.target.value.replace('x', '⋅');
            } else if (e.target.value === 'x') {
                return prev + '⋅';
            } else if (prev === '0' || (result && e.target.value !== '.')) {
                return e.target.value;
            } else if (e.target.value === '.' && (prev === '' || result)){
                return '0' + e.target.value;
            } else {
                return prev + e.target.value;
            }
        });
        setDisplay(prev => {
            if (e.target.value === '.') {
                if (result) {
                    setResult(null);
                    return '0.';
                }
                return prev + e.target.value;
            } else if ( (/[-+x/=]/.test(prev) || /[-+x/=]/.test(e.target.value) ) || prev === '0' || result) {
                setResult(null);
                return e.target.value;
            } else {
                setResult(null);
                return prev + e.target.value;
            }
        });
    }

    const reset = () => {
        setFormula('');
        setDisplay('0');
        setResult(null);
    }

    return value === 'AC' ? reset : value === '=' ? calculate : handleClick;
}

export default useButton;
