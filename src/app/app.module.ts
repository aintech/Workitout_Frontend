import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExerciseCreateComponent } from './exercise/exercise-create/exercise-create.component';
import { ExerciseEditComponent } from './exercise/exercise-edit/exercise-edit.component';
import { ExerciseService } from './exercise/exercise.service';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { WorkoutEditComponent } from './workout/workout-edit/workout-edit.component';
import { WorkoutService } from './workout/workout.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WorkoutSchedulerComponent } from './calendar-view/workout-scheduler/workout-scheduler.component';
import { WorkoutScheduleService } from './calendar-view/workout-scheduler/workout-schedule.service';

const appRoutes: Routes = [
  {
    path: 'calendar-view',
    component: CalendarViewComponent,
    data: { title: 'Calendar' }
  },
  {
    path: 'workout-list',
    component: WorkoutListComponent,
    data: { title: 'Workouts' }
  },
  {
    path: 'workout-edit/:id',
    component: WorkoutEditComponent,
    data: { title: 'Workout Editor' }
  },
  {
    path: 'exercise-list',
    component: ExerciseListComponent,
    data: { title: 'Exercise List' }
  },
  {
    path: 'exercise-create',
    component: ExerciseCreateComponent,
    data: { title: 'Exercise Create' }
  },
  {
    path: 'exercise-edit/:id',
    component: ExerciseEditComponent,
    data: { title: 'Exercise Edit' }
  },
  {
    path: '',
    redirectTo: '/calendar-view',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    ExerciseCreateComponent,
    ExerciseEditComponent,
    WorkoutListComponent,
    WorkoutEditComponent,
    HeaderComponent,
    FooterComponent,
    CalendarViewComponent,
    WorkoutSchedulerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ExerciseService, WorkoutService, WorkoutScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
