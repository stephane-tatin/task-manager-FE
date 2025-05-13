import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Priority, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  initTaskForm(task: Task) {
    return new FormGroup(
      {
        id: new FormControl(task?.id),
        title: new FormControl(task?.title || '', [Validators.required]),
        description: new FormControl(task?.description || '', [
          Validators.required,
        ]),
        targetTime: new FormControl(task?.targetTime || '', [
          this.dateInPastValidator(),
        ]),
        priority: new FormControl(task?.priority || Priority.LOW),
        assignedToId: new FormControl(task?.assignedToId || ''),
        statusColumnId: new FormControl(task?.statusColumnId || ''),
        createdAt: new FormControl(task?.createdAt),
      },
      { updateOn: 'change' }
    );
  }

  private dateInPastValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return Date.now() > Date.parse(control.value)
        ? { dateInPast: true }
        : null;
    };
  }
}
