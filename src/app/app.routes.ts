import { Routes } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralIntelligenceComponent } from './general-intelligence/general-intelligence.component';
import { DemolitionComponent } from './demolition/demolition.component';
import { SearchDSIComponent } from './search-dsi/search-dsi.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'programs',
    component: ProgramComponent,
    title: 'Programs',
  },
  {
    path: 'program/:id',
    component: ProgramDetailComponent,
    title: 'Program',
  },
  {
    path: 'general_intelligence',
    component: GeneralIntelligenceComponent,
    title: 'General Intelligence',
  },
  {
    path: 'demolition',
    component: DemolitionComponent,
    title: 'Demolition',
  },
  {
    path: 'search',
    component: SearchDSIComponent,
    title: 'Search DSI',
  },
];
