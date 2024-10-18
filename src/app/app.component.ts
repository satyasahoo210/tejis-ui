import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      active: this.router.url === '/',
    },
    {
      label: 'Programs',
      icon: 'programs',
      route: '/programs',
      active: this.router.url === '/programs',
    },
    {
      label: 'General Intelligence',
      icon: 'general_intelligence',
      route: '/general_intelligence',
      active: this.router.url === '/general_intelligence',
    },
    {
      label: 'Demolition',
      icon: 'demolition',
      route: '/demolition',
      active: this.router.url === '/demolition',
    },
    {
      label: 'Search DSI',
      icon: 'search_dsi',
      route: '/search',
      active: this.router.url === '/search',
    },
  ];

  expanded = false;

  closeSidebar() {
    this.expanded = false;
  }

  openSidebar() {
    this.expanded = true;
  }
}
