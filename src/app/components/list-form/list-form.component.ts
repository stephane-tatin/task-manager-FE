import { Component, Inject, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-list-form',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './list-form.component.html',
  styleUrl: './list-form.component.scss',
})
export class ListFormComponent {
  readonly dialogRef = inject(MatDialogRef<ListFormComponent>);
  listForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.listForm = new FormGroup(
      {
        id: new FormControl(data?.id),
        title: new FormControl(data?.title || '', [Validators.required]),
      },
      { updateOn: 'blur' }
    );

    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe((_) => {
      if (this.listForm.valid) {
        this.dialogRef.close(
          this.listForm.pristine ? null : { data: this.listForm.value }
        );
      }
    });
  }

  // get title(): AbstractControl {
  //   return this.taskForm.get('title')!;
  // }

  closeWithoutSaving() {
    this.dialogRef.close();
  }

  updateErrorMessage() {}
}
