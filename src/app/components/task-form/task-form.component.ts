import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  inject,
  model,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Priority, Task } from '../../models/task.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  // readonly data = inject<any>(MAT_DIALOG_DATA);
  // readonly title = model(this.data.title);
  taskForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private userService: UserService
  ) {
    this.taskForm = new FormGroup(
      {
        id: new FormControl(task?.id || '', [Validators.required]),
        title: new FormControl(task?.title || '', [Validators.required]),
        description: new FormControl(task?.description || ''),
        targetTime: new FormControl(task?.targetTime || '', [
          this.dateInPastValidator(),
        ]),
        priority: new FormControl(task?.priority || Priority.LOW),
        assignedTo: new FormControl(task?.assignedTo?.id || ''),
      },
      { updateOn: 'blur' }
    );

    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe((_) => {
      if (this.taskForm.valid) {
        this.dialogRef.close({ data: this.taskForm.value });
      }
    });
  }

  get priorityLevels() {
    return Object.values(Priority);
  }

  get appUsers() {
    return this.userService.appUserListSignal();
  }

  dateInPastValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return Date.now() > Date.parse(control.value)
        ? { dateInPast: { value: true } }
        : null;
    };
  }

  updateErrorMessage() {}
}
