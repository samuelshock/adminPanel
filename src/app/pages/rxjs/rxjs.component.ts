import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs/Observable'; // en caso de produccion porque es mas lijero
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    // .retry(2) // las veces que se realizara el re intento si no tiene nada intentara infinitamente.
    .subscribe(
      numero => console.log(' subs ', numero),
      error => console.error(' Error ', error),
      () => console.log(' El observador termino! ')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<number> {
    return new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Test error observable boom!!');
        // }
      }, 500);

    })
    .retry(2)
    .map( (res: any) => {
      return res.valor;
    })
    .filter( (valor, index) => {
        // console.log('Filter ', valor, index);
        return (valor % 2) === 1 ? true : false;
    });
  }

}
