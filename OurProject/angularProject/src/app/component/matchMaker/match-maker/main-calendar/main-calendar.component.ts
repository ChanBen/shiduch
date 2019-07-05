// import { Component, OnInit } from '@angular/core';
// import { Meeting } from 'src/app/models/meeting';

// @Component({
//   selector: 'app-main-calendar',
//   templateUrl: './main-calendar.component.html',
//   styleUrls: ['./main-calendar.component.css']
// })
// export class MainCalendarComponent  {

//   isNew = null;
//   appointmentDetail: Meeting;
//   appointments: Meeting[] = [
//     {
//       id: new Date().getTime().toString(),
//       title: 'event1',
//       start: new Date()
//     }
//   ];

//   onRequestNewAppointment(e: Meeting): void {
//     this.isNew = true;
//     this.appointmentDetail = e;
//   }

//   onRequestUpdateAppointment(e: Meeting): void {
//     this.isNew = false;
//     this.appointmentDetail = e;
//   }

//   onCloseAppointmentDetail(): void {
//     this.appointmentDetail = null;
//     this.isNew = null;
//   }

//   onAdd(appointment: Meeting): void {
//     this.appointments = [...this.appointments, { id: new Date().getTime().toString(), ...appointment }];
//     this.onCloseAppointmentDetail();
//   }

//   onUpdate(appointment: Meeting): void {
//     this.appointments = this.appointments.map(
//       a => a.id === appointment.id ? { ...a, ...appointment } : a
//     );
//     this.onCloseAppointmentDetail();
//   }

//   onAppointmentUpdated(appointment: Meeting): void {
//     this.onUpdate(appointment);
//   }

// }
