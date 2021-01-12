import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, last, takeLast, skip, tap, take } from 'rxjs/operators';

/**
 * last - recoge el ultimo evento emitido.
 * takeLast - recoge las ultimas posiciones indicadas.
 * skip - se salta los primeros eventos indicados. 
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
        take(10),
        tap(val => {
            console.log(`Los 10 primeros clicks - ${val}`);
        }),
        // last(),
        // takeLast(5),
        skip(5)
    )
    const subscription = clickSource.subscribe(data => displayLog(data));

}