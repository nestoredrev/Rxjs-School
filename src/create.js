import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, first, take, takeWhile } from 'rxjs/operators';

/**
 * first - recoger el primer evento.
 * take - dejar de emitir los siguientes eventos a partir de un evento indicado. Pj: take(4)
 * takeWhile- emitir eventos mientras se cumpla la condicion
 * 
 * 
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
        // first( val => {
        //     return val;
        // })
        //take(4),
        takeWhile( ([col, row]) => col > 3 ) // Si se pincha en una columna menor igual que tres se deja de emitir
    )
    const subscription = clickSource.subscribe(data => displayLog(data));

}