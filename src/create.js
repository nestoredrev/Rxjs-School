import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap, reduce, takeWhile, scan } from 'rxjs/operators';

/**
 * Muy util para el carrito de la compra. Para obtener el total de los productos acumulados en el carro
 * reduce - un unico evento al acabar
 * scan - por cada uno de los eventos
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
        // reduce( ( accumulated, current ) => {
        //     return {
        //         clicks: accumulated.clicks + 1,
        //         cells: [...accumulated.cells, current]
        //     }
        // }, {clicks: 0, cells:[]} ) // semilla
        scan( ( accumulated, current ) => {
            return {
                clicks: accumulated.clicks + 1,
                cells: [...accumulated.cells, current]
            }
        }, {clicks: 0, cells:[]} ) // semilla
    )
    const subscription = clickSource.subscribe(data => displayLog(`${data.clicks} clicks: ${JSON.stringify(data.cells)} `));

}