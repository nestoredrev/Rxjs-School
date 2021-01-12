import { displayLog } from './utils';
import { from, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * tap simplemente devuelve la informacion que le viene
 */

export default () => {

    const grid = document.getElementById('grid');
    const clickSource = fromEvent(grid, 'click').pipe(
        tap (val => {
            console.log('Before', val);
        }),
        map(val => {
            // Devuelve la posicion de la casilla del grid
            return [
                Math.floor(val.offsetX / 50), 
                Math.floor(val.offsetY / 50)
            ]
        }),
        tap(val => {
            console.log(`After - ${val}`);
        })
    )
    const subscription = clickSource.subscribe(data => displayLog(data));

}