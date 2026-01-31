import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-card-modal',
  templateUrl: './create-card-modal.component.html',
  styleUrls: ['./create-card-modal.component.scss'],
  imports: [ReactiveFormsModule]
})
export class CreateCardModalComponent implements OnInit {
form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateCardModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { userName: string }
  ) {
    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(6)]],
      cardName: ['', Validators.required],
      cardType: ['COMUM', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
