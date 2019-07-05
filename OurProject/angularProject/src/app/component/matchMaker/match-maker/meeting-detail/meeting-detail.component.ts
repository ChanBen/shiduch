// import { Component, OnInit, EventEmitter, SimpleChanges, Input, Output, OnChanges } from '@angular/core';
// import { Meeting } from 'src/app/models/meeting';
// import { FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-meeting-detail',
//   templateUrl: './meeting-detail.component.html',
//   styleUrls: ['./meeting-detail.component.css']
// })
// export class MeetingDetailComponent  implements OnChanges {
//   @Input() meeting: Meeting;
//   @Input() isNew: boolean;
//   @Output() close = new EventEmitter();
//   @Output() add = new EventEmitter<Meeting>();
//   @Output() update = new EventEmitter<Meeting>();
//   form = this.formBuilder.group({
//     title: [null, Validators.required],
//     allDay: [null],
//     start: [],
//     end: []
//   })
//   constructor(private formBuilder: FormBuilder) { }

//   ngOnChanges(simpleChanges: SimpleChanges): void {
//     if (simpleChanges.appointment && simpleChanges.appointment.currentValue) {
//       this.form.patchValue({ ...this.meeting });
//     }
//   }

//   onAdd(): void {
//     const { end, start, title, allDay } = this.form.value;
//     this.add.emit({ end: end && new Date(end), start: start && new Date(start), title, allDay });
//   }

//   onUpdate(): void {
//     const { end, start, title, allDay, id } = this.form.value;
//     this.update.emit({ id: this.meeting.id, end: end && new Date(end), start: start && new Date(start), title, allDay });
//   }
// }