import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SideNavComponent } from './side-nav/side-nav.component';


export const routes: Routes = [
    
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    { path: '', component: SideNavComponent }, // Default route
    { path: 'projects', component: ProjectListComponent },
   { path: 'projects/:id', component: ProjectDetailsComponent }
  ];
  