import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type ID = string;
export type ProgramEntity = {
  id?: ID;
  name: string;
  summary: string;
  section: string;
  zone: string;
  orgId: ID;
  startDate: Date;
  endDate: Date;
};

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  getPrograms() {
    return this.http.get<Array<ProgramEntity>>('@api/Programs');
  }

  getProgram(id: string) {
    return this.http.get<ProgramEntity>(`@api/Programs/${id}`);
  }

  createProgram(program: ProgramEntity) {
    return this.http.post('@api/Programs', program);
  }

  updateProgram(id: string, program: ProgramEntity) {
    return this.http.put(`@api/Programs/${id}`, program);
  }

  deleteProgram(id: string) {
    return this.http.delete(`@api/Programs/${id}`);
  }
}
