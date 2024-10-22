import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

export interface FormControlData {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'number' | 'textarea' | 'select' | 'date';
  placeholder?: string;
  classes?: Array<string>;
  options?: Array<{ value: string; label?: string }>;
}

export type Options = Exclude<FormControlData['options'], undefined>;

export interface DialogData<> {
  title: string;
  controls: FormControlData[];
  formGroup: FormGroup<any>;
}

@Component({
  selector: 'form-dialog',
  templateUrl: 'form-dialog.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    AsyncPipe,
  ],
})
export class FormDialog {
  constructor(
    public dialogRef: MatDialogRef<FormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  filteredOptions: Record<string, Observable<Options>> = {};

  ngOnInit() {
    this.data.controls
      .filter((c) => c.options)
      .forEach(
        (control) =>
          (this.filteredOptions[control.name] = (
            this.data.formGroup.get(control.name) as AbstractControl
          ).valueChanges.pipe(
            startWith(''),
            map((value) =>
              this._filter(value || '', control.options as Options)
            )
          ))
      );
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.formGroup.valid) {
      this.dialogRef.close(this.data.formGroup.value);
    }
  }

  getErrorMessage(control_name: string, errors: ValidationErrors | null) {
    if (errors) {
      return Object.entries(errors)
        .map(([key, value]) => {
          switch (key) {
            case 'required':
              return `${control_name} is required!`;
              break;
            case 'pattern':
              return `${control_name} has wrong pattern!`;
              break;
            case 'email':
              return `${control_name} has wrong email format!`;
              break;
            case 'minlength':
              return `${control_name} has wrong length! Required length: ${value.requiredLength}`;
              break;
            case 'areEqual':
              return `${control_name} must be equal!`;
              break;
            default:
              return `${control_name}: ${key}: ${value}`;
          }
        })
        .join('. ');
    }
    return '';
  }

  private _filter(value: string, options: Options): Options {
    const filterValue = value.toLowerCase();

    return options.filter((option) =>
      (option.label ?? option.value).toLowerCase().includes(filterValue)
    );
  }
}
