import { Component } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';


@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})


export class PortadaComponent implements OnInit {
  animationSubject = new Subject<string>();

  persona: persona = new persona("","","");

  constructor(public personaService: PersonaService) { }

  ngOnInit() {
    this.personaService.getPersona().subscribe(data => {this.persona = data})
    this.startAnimation();
  }

  startAnimation() {
    const message = '>Fullstack Developer Jr._';
    let i = 0;
  
    // Emite un valor cada 100 milisegundos
    interval(100).pipe(
      takeWhile(() => i <= message.length),
      map(() => {
        // Añade un guión al final del mensaje mientras se está escribiendo
        return i === message.length ? message : message.substring(0, i++) + '_';
      })
    ).subscribe(this.animationSubject);
  }
  
}