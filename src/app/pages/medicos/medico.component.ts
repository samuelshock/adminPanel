import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe( (res: any) => this.hospitales = res.hospitales);
  }

  guardarMedico( f: NgForm) {
    console.log(f);
  }
}
