import { displayLog } from './utils';
import { from, fromEvent } from 'rxjs';
import { mapTo, map, filter } from 'rxjs/operators';

/**
 * mapTo - por cada evento siempre devuelve el mismo valor (valor constante)
 */

export default () => {

    const grid = document.getElementById('grid');
    const clickSource = fromEvent(grid, 'click').pipe(
        map(val => {
            // Devuelve la posicion de la casilla del grid
            return [
                Math.floor(val.offsetX / 50), 
                Math.floor(val.offsetY / 50)
            ]
        }),
        filter( val => { 
            //Segun los valroes que devuelva el map
            // solo se mostraran las casillas impares. 
            return (val[0] + val[1]) % 2 != 0;
        }) 
    )
    const subscription = clickSource.subscribe(data => displayLog(data));

}