import { CitasService } from './../services/citas.service';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  events: any[] = []; // Almacena las citas obtenidas

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.getCitas(); // Llama a obtener citas al inicializar
  }

  // Obtener todas las citas desde el servicio
  getCitas() {
    this.citasService.getCitas().subscribe((citas) => {
      this.events = citas.map(cita => ({
        title: cita.title,
        date: cita.date
      }));
      console.log('citas', this.events);

      // Asigna los eventos al calendario después de obtener los datos
      this.calendarOptions.events = this.events;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    // duration
    slotMinTime: "9:00",

    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    headerToolbar: {
      right: 'prev,next', // Elimina el botón 'today' aquí
      center: 'title',
      left: 'timeGridWeek,timeGridDay'
    },
    events: [], // Inicialmente vacío, se llenará después en getCitas
    height: 600, // Establece una altura fija en píxeles
  };

  handleDateClick(arg: DateClickArg) {
    alert('Date click! ' + arg.dateStr);
  }
}
