import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogData,
  FormDialog,
} from '../components/forms/form-dialog.component';
import moment from 'moment';
import { ProgramEntity, ProgramService } from '../services/program.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe],
  templateUrl: './program.component.html',
  styleUrl: './program.component.css',
  host: { class: 'w-full h-full' },
})
export class ProgramComponent {
  programService = inject(ProgramService);
  formBuilder = inject(FormBuilder);
  programs$: Observable<ProgramEntity[]>;

  constructor(private dialog: MatDialog) {
    this.programs$ = this.programService.getPrograms();
  }

  programForm = this.formBuilder.group({
    name: ['', Validators.minLength(5)],
    summary: ['', Validators.required],
    section: [''],
    zone: [''],
    org: ['AAP'],
    startDate: [
      moment().format('YYYY-MM-DD'),
      (control: AbstractControl) =>
        moment(control.value).isSameOrAfter(moment().format('YYYY-MM-DD'))
          ? null
          : { date: 'should not be in past' },
    ],
    endDate: [
      moment().format('YYYY-MM-DD'),
      (control: AbstractControl) =>
        moment(control.value).isSameOrAfter(moment().format('YYYY-MM-DD'))
          ? null
          : { date: 'should not be in past' },
    ],
    lastActedBy: [''],
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialog, {
      data: {
        controls: [
          {
            label: 'Program Name',
            name: 'name',
          },
          {
            label: 'Section',
            name: 'section',
          },
          {
            label: 'Zone',
            name: 'zone',
          },
          {
            label: 'Organization',
            name: 'org',
            type: 'select',
            options: [{ value: 'BJP' }, { value: 'AAP' }, { value: 'BJD' }],
          },
          {
            label: 'Start Date',
            name: 'startDate',
            type: 'date',
          },
          {
            label: 'End Date',
            name: 'endDate',
            type: 'date',
          },
          {
            label: 'Summary',
            name: 'summary',
            type: 'textarea',
          },
        ],
        title: 'Create Program',
        formGroup: this.programForm,
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.programService.createProgram(result).subscribe(() => {
        this.programs$ = this.programService.getPrograms();
      });
    });
  }
}
