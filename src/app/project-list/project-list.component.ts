// project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  projectName: string;
  totalBudget: number;
  utilizedAmount: number;
  remainingBalance: number;
  poCount: number; // Number of POs associated
}


@Component({
  selector: 'app-project-list',
  imports:[CommonModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = []; // Explicitly typed as an array of Project
  private apiUrl = 'https://api.example.com/projects'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>(this.apiUrl).subscribe((data) => {
      this.projects = data;
    });
  }

  editProject(projectId: number) {
    console.log('Edit project:', projectId);
    // Logic for editing the project
  }

  deleteProject(projectId: number) {
    this.http.delete('${this.apiUrl}/${projectId}').subscribe(() => {
      this.loadProjects(); // Reload the project list after deletion
    });
  }
}