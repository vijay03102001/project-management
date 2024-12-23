import { Component } from '@angular/core';
import { POAssociationComponent } from "./project-association/project-association.component";
import { RouterOutlet,Router } from '@angular/router';
import { ProjectDetailsComponent } from "./project-details/project-details.component";

import { ProjectListComponent } from "./project-list/project-list.component";
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from "./side-nav/side-nav.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SideNavComponent, POAssociationComponent, ProjectListComponent,ProjectDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-management';
  constructor(private router: Router) {}
  navigateTo(event: Event) {
    const target = event.target as HTMLSelectElement; // Explicitly cast to HTMLSelectElement
    const route = target.value; // Access the value property
    if (route) {
      this.router.navigateByUrl(route); // Navigate to the selected route
    }
  }

 
}
