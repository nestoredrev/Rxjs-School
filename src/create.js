import { displayLog } from './utils';
import { fromEvent } from 'rxjs';

/**
 * fromEvent - sobreescribre sobre cualquier evento de la interfaz (dom).
 */

export default () => {

    const myBtn = document.getElementById('myButton');
    const source = fromEvent(myBtn, 'click');
    source.subscribe(evento => {
        displayLog(`Click event ap pos ${evento.x} - ${evento.y}`);
    })


    fromEvent(document, 'mousemove').subscribe(pos => {
        console.log(pos);
    })

}