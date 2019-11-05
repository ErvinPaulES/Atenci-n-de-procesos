import Proceso from './Proceso.js';
import Dado from './Dado.js';

class Main{
    constructor(){
        this._Actual = null;
        document.querySelector('#Iniciar').addEventListener('click', () => {
            let dado = new Dado();
            let contnulo = 0;
            let contCompletado = 0;
            let a = 1;
            let numProcesosfaltantes = 0;
            let SumaCiclosfaltantes = 0;
            for(let i=0;i<300;i++){
                if(dado.Lanzar()<=39){
                    this.agregarProceso(new Proceso('p'+a, Math.ceil(Math.random()*11)+3));
                    console.log('Se agrego nuevo proceso');
                    a++;
                }
                if(this._Actual!==null){
                    this._Actual.ciclo-=1;
                    
                    if(this._Actual.ciclo===0){
                        contCompletado++;
                        console.log('Se completo el proceso '+ this._Actual.nombre);
                        this._Actual=this._Actual.siguiente;
                    }
                }else{
                    contnulo++;
                }
            }
            let faltantes = this._Actual;
            while(faltantes!==null){
                numProcesosfaltantes++;
                SumaCiclosfaltantes+=this._Actual.ciclo;
                faltantes=faltantes.siguiente;
            }
            console.log('Los ciclos que estuvo vacio la cola ' + contnulo);
            console.log('El numero de procesos que se atendieron completamente son: '+ contCompletado);
            console.log('El numero de procesos que quedaron pendientes son: '+ numProcesosfaltantes);
            console.log('La suma de ciclos de los procesos pendientes es: ' + SumaCiclosfaltantes);
            
            
        })
        
    } 
    agregarProceso(proceso){
        if(this._Actual===null){
          this._Actual=proceso;
        }else{
              this._agregarproceso(proceso, this._Actual);
        }       
    }
    _agregarproceso(nuevo, ultimo){
          if(ultimo.siguiente===null){
            ultimo.siguiente=nuevo;
          }else{
            this._agregarproceso(nuevo, ultimo.siguiente)
          }
    }
}
let main = new Main();