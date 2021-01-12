import { displayLog } from './utils';
import { interval, timer } from 'rxjs';

/**
 * interval - es lo mismo que setInterval de javascript pero te puedes sobreescrbir.
 * El interval hay que cancelarlo porque su ejecucion no para.
 * timer - es lo mismo que setTimeout de javascript pero te puedes sobreescribr.
 * 
 */

export default () => {

    const source = interval(500);
    const subscription = source.subscribe(evento => displayLog(evento));
    timer(3000).subscribe( () => subscription.unsubscribe() );


}