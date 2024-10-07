import { CitasService } from './../services/citas.service';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ModalController } from '@ionic/angular';
import { CitaFormComponent } from './cita-form/cita-form.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {
  events: any[] = []; // Almacena las citas obtenidas
  selectedEvents: any;
  showForm = false;

  constructor(private citasService: CitasService, private modalController: ModalController) {}

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
      // Establece el horario mínimo para las citas
      // this.calendarOptions.slotMinTime = new Date(arg.date).toISOString().substr(11, 5);

    });
  }

  async openModal(cita: any = null) {
    const modal = await this.modalController.create({
      component: CitaFormComponent,
      componentProps: { cita }, // Pasa la cita seleccionada
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.handleFormSubmit(result.data);
      }
    });
    return await modal.present();
  }

  closeModal() {
    this.showForm = false;
    this.selectedEvents = null; // Borra la selección de eventos
  }

  handleFormSubmit(citaData: any) {
    // Verifica si la cita tiene un ID. Si tiene, actualiza; si no, crea uno nuevo
    if (citaData.id) {
      this.updateCita(citaData); // Llama a updateCita cuando hay un id
    } else {
      this.createCita(citaData); // Llama a createCita cuando no hay un id
    }
  }

  // Método para crear una nueva cita usando el servicio
  createCita(citaData: any) {
    this.citasService.createCita(citaData).subscribe((cita) => {
      console.log('Cita creada:', cita);
      this.events.push(cita); // Añade la cita al calendario
      this.getCitas();
      this.closeModal(); // Cierra el modal
    },
  (error) => {
      console.error('Error al crear la cita:', error);
    });
  }

  // Método para actualizar una cita usando el servicio
  updateCita(citaData: any) {
    this.citasService.updateCita(citaData.id, citaData).subscribe((cita) => {
      console.log('Cita actualizada:', cita);
      // Actualiza la cita en el calendario
      const index = this.events.findIndex(c => c.id === citaData.id);
      this.events[index] = cita;
      this.closeModal(); // Cierra el modal
    },
    (error) => {
      console.error('Error al actualizar la cita:', error);
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
