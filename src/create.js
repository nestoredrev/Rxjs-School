import { updateDisplay, displayLog } from './utils';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';

/**
 *  Subject - permite realizar multicast entre los observable de instancian de el.
 *  Actua como un distribuidor entre sus instancias de observables.
 * 
 */

export default () => {
    /** start coding */
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )
    
    // BehaviorSubject es lo mismo que Subject lo que pasa que lo puede incializar sin el next
    // Tambien se puede obtener el valor inicial con value
    const scrollProgressHot$ = new BehaviorSubject(0);
    scrollProgress$.subscribe(scrollProgressHot$);

    //subscribe to scroll progress to paint a progress bar
    const subscription = scrollProgressHot$.subscribe(updateProgressBar);

    // mostrar porcentaje en la pantalla del scroll bar
    const subscription2 = scrollProgressHot$.subscribe (val => {
        updateDisplay(`${Math.floor(val)} %`)
    })

    // inicializar el scrollbar a 0
    // scrollProgressHot$.next(0);

    console.log("scroll intial state: ", scrollProgressHot$.value);


    /** end coding */
}