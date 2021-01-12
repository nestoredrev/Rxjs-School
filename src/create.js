import { displayLog } from './utils';
import { of, range } from 'rxjs';

/**
 * of - crear secuencia de observables practicamente de cualquier tipo de dato.
 */

export default () => {
    
    const source = of(1,2,3,4,5,6);
    const source2 = of(
        [10, 11, 12],
        `Nestor Edrev`,
        {apellidos: 'Dobrinov'},
        () => {
            return `Hola amigo`
        }
    )

    // range - secuencia ordenada de numeros
    const source3 = range(3, 10);

    const subscription = source3.subscribe(data => displayLog(data));
}