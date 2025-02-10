import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  inject,
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Priority, Task } from '../../models/task.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { messages } from '../../utils/messages';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  taskForm!: FormGroup;
  messages = messages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private userService: UserService
  ) {
    console.log('task', task);
    this.taskForm = new FormGroup(
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
      { updateOn: 'blur' }
    );

    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe((_) => {
      console.log('this.task', this.taskForm);

      if (this.taskForm.valid) {
        this.dialogRef.close(
          this.taskForm.pristine ? null : { data: this.taskForm.value }
        );
      }
    });
  }

  get priorityLevels() {
    return Object.values(Priority);
  }

  get appUsers() {
    return this.userService.appUserListSignal();
  }

  get title(): AbstractControl {
    return this.taskForm.get('title')!;
  }

  get description(): AbstractControl {
    return this.taskForm.get('description')!;
  }

  get targetTime(): AbstractControl {
    return this.taskForm.get('targetTime')!;
  }

  dateInPastValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return Date.now() > Date.parse(control.value)
        ? { dateInPast: true }
        : null;
    };
  }

  closeWithoutSaving() {
    this.dialogRef.close();
  }

  updateErrorMessage() {}
}
