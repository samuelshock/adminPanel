import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  since: number = 0;

  loading: boolean = false;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedico( term: string) {
    if (term.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.loading = true;

    this._medicoService.buscarMedico(term).subscribe( (medicos: Medico[]) => {
      this.medicos = medicos;
      this.loading = false;
    });
  }

  cargarMedicos() {
    this.loading = true;
    this._medicoService.cargarMedicos(this.since)
    .subscribe( medicos => {
      this.medicos = medicos;
      this.loading = false;
    });
  }

  borrarMedico( medico: Medico) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( willDelete => {
      if (willDelete) {
        this._medicoService.borrarMedico(medico._id)
        .subscribe( res => {
          this.cargarMedicos();
        });
      }
    });
  }

  changeSince( value: number) {

    let since = this.since + value;

    if (since >= this._medicoService.totalMedicos) {
      return;
    }
    if (since < 0) {
      return;
    }

    this.since += value;
    this.cargarMedicos();
  }

}
