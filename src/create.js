import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, takeWhile, startWith, endWith } from 'rxjs/operators';

/**
 * startWidth - emite un argumento justo antes de empezar a escuchar el evento. Como un incializador
 * endWith - es lo mismo pero al final cuando termina el while
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
        takeWhile( ([col, row]) => {
            return col != 0;
        }),
        tap(val => console.log(`cell: ${val}`)),
        //startWith(`Esto es un tablero de 10x10`)
        endWith(`Game over. Has puslado la columna 0`)
    )
    const subscription = clickSource.subscribe(data => displayLog(`${data}`));

}