import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/',
    },
    {
      label: 'Programs',
      icon: 'programs',
      route: '/programs',
    },
    {
      label: 'General Intelligence',
      icon: 'general_intelligence',
      route: '/general_intelligence',
    },
    {
      label: 'Demolition',
      icon: 'demolition',
      route: '/demolition',
    },
    {
      label: 'Search DSI',
      icon: 'search_dsi',
      route: '/search',
    },
  ];
  expanded = false;
  activeUrl = '';
  hederLabel = '';

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.activeUrl = event.url;
        this.hederLabel =
          this.menuItems.find((item) => item.route === event.url)?.label ??
          'Hello, Analyst!';
      });
  }

  closeSidebar() {
    this.expanded = false;
  }

  openSidebar() {
    this.expanded = true;
  }
}
