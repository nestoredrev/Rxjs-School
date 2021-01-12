import { displayLog } from './utils';
import { of, interval, zip } from 'rxjs';
import { from } from 'rxjs';

/**
 * from sirve para crear observables a partir de arrays o promesas. 
 * Por cada elemento de array es un evento.
 * Tambien sirve para convertir a una promesa a observable.
 */

export default () => {

    const myArray = [1,2,3,4,5];
    const myString = `Nestor Edrev`;
    const myPromise = new Promise( (resolve, reject) => {

        setTimeout(() => {
            resolve(`My promise its DONE`);
        }, 2000)
    })

    //const observable = from(myArray);
    //const observable = from(myString);
    const observable = from(myPromise);
    observable.subscribe( event => displayLog(event));

}