import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-workout-scheduler',
  templateUrl: './workout-scheduler.component.html',
  styleUrls: ['./workout-scheduler.component.css']
})
export class WorkoutSchedulerComponent implements OnInit {

  @Input() closeable: boolean = true;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close () {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
