import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
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
import { filter } from 'rxjs';
import { FormService } from '../../services/form.service';
import { FormDialogService } from '../../services/form-dialog.service';
import { TaskService } from '../../services/task.service';

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
    private userService: UserService,
    private formService: FormService,
    private formDialogService: FormDialogService,
    private taskService: TaskService
  ) {
    this.taskForm = this.formService.initTaskForm(task);
    this.initDialogConfig();
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

  closeWithoutSaving() {
    this.dialogRef.close();
  }

  initDialogConfig() {
    this.dialogRef.disableClose = true;
    this.dialogRef
      .keydownEvents()
      .pipe(filter((e) => e.key === 'Enter' || e.key === 'Escape'))
      .subscribe(() => {
        this.formDialogService.handleDialogData(this.dialogRef, this.taskForm);
      });

    this.dialogRef.backdropClick().subscribe(() => {
      this.formDialogService.handleDialogData(this.dialogRef, this.taskForm);
    });
  }

  updateErrorMessage() {}

  deleteTask() {
    this.taskService.delete(this.task.id);
    this.dialogRef.close();
  }
}
