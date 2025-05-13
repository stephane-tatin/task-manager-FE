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
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { filter } from 'rxjs';
import { FormDialogService } from '../../services/form-dialog.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ColumnWithTasks,
    private formDialogService: FormDialogService
  ) {
    this.listForm = new FormGroup(
      {
        id: new FormControl(data?.id),
        title: new FormControl(data?.title || '', [Validators.required]),
      },
      { updateOn: 'change' }
    );

    this.dialogRef.disableClose = true;

    this.dialogRef
      .keydownEvents()
      .pipe(filter((e) => e.key === 'Enter' || e.key === 'Escape'))
      .subscribe(() => {
        this.formDialogService.handleDialogData(this.dialogRef, this.listForm);
      });

    this.dialogRef.backdropClick().subscribe(() => {
      this.formDialogService.handleDialogData(this.dialogRef, this.listForm);
    });
  }

  closeWithoutSaving() {
    this.dialogRef.close();
  }
}
