import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
  imports:[ReactiveFormsModule]
})
export class CreateUserModalComponent {

   form: FormGroup;
  isEdit = false;

  constructor(
    private dialogRef: MatDialogRef<CreateUserModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: { user?: any }
  ) {
    this.isEdit = !!data?.user;

    this.form = this.fb.group({
      name: [data?.user?.name ?? '', Validators.required],
      email: [data?.user?.email ?? '', [Validators.required, Validators.email]],
      password: [
        '',
        this.isEdit ? [] : [Validators.required, Validators.minLength(6)]
      ],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.data?.user,
      ...this.form.value,
    };

    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
