import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProgramEntity, ProgramService } from '../services/program.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-program-detail',
  standalone: true,
  imports: [MatSlideToggleModule, DatePipe],
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.css',
  host: { class: 'w-full h-full' },
})
export class ProgramDetailComponent {
  route = inject(ActivatedRoute);
  program: Partial<ProgramEntity> = {};
  date = new Date();

  constructor(private location: Location, private service: ProgramService) {
    service
      .getProgram(this.route.snapshot.params['id'])
      .subscribe((program) => {
        this.program = program;
      });
  }

  back(): void {
    this.location.back();
  }
}
