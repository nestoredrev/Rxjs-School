import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, takeWhile, endWith, distinct, distinctUntilChanged } from 'rxjs/operators';

/**
 * distinct - evita repeticiones. En este caso no deja pulsar la misma celda.
 * distinctUntilChanged - es lo mismo pero con una condicion.
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
        // distinct( ([col, row]) => `${col} - ${row}` ),
        distinctUntilChanged( (cell1, cell2) => { // solamente evita pulsar una vez sobre la misma casilla
            if( cell1[0] == cell2[0] && cell1[1] == cell2[1] ) {
                return true;
            }
        } ),
        endWith(`Game over. Has puslado la columna 0`)
    )
    const subscription = clickSource.subscribe(data => displayLog(`${data}`));

}