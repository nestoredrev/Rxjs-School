import { displayLog } from './utils';
import { of, interval, zip } from 'rxjs';
import { Observable, Observer } from 'rxjs';

export default () => {
    
    // crear un obsersable
    const hello = new Observable( observer => {
        observer.next('Hello');
        setTimeout(() => {
            observer.next('World');
            observer.complete(); // indicar al Observable que ya ha terminado
        }, 2000);
    });


    // Estructura de un observable
    const observer = {
        next: evt => displayLog(evt),
        error: err => console.log(`[ERR] - ${err}`),
        complete: () => displayLog(`[DONE]`)
    }


    // subscripcion a los eventos del observable
    const subscribre = hello.subscribe( observer );
    subscribre.unsubscribe(); // cancelar la subscripcion desde fuera, pero solo se ejecutara el codigo sincrono

    // subscripcion a los eventos del observable
    // const subscribre = hello.subscribe( event => {
    //     displayLog(event);
    // });
}