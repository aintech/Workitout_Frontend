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

const appRoutes: Routes = [
  {
    path: 'workout-list',
    component: WorkoutListComponent,
    data: { title: 'Workout List' }
  },
  {
    path: 'workout-edit/:id',
    component: WorkoutEditComponent,
    data: { title: 'Workout Edit' }
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
    redirectTo: '/workout-list',
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ExerciseService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
