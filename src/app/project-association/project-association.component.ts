import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { SideNavComponent } from '../side-nav/side-nav.component';


interface PO {
  id: number; 
  poNumber: string;
  value: number;
  utilized: number;
  remaining: number;
}


@Component({
  selector: 'app-po-association',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,SideNavComponent],
  templateUrl: './project-association.component.html',
  styleUrls: ['./project-association.component.css'],
})
export class POAssociationComponent {
  @Input() projectId!: number; // Input from the parent
  @Output() poAdded = new EventEmitter<void>();
  po = { poNumber: null, value: null, utilized: null };
  private apiUrl = 'https://api.example.com/projects';
  pos: PO[] = [];
  constructor(private http: HttpClient) {}

  addPO() {
    if (!this.po.poNumber || !this.po.value || !this.po.utilized) {
      console.error('PO object is incomplete:', this.po);
      return;
    }

    this.http.post(`${this.apiUrl}/${this.projectId}/pos`, this.po).subscribe({
      next: (response) => {
        console.log('PO added successfully:', response);
        this.poAdded.emit();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding PO:', error);
      },
    });
  }

  resetForm() {
    this.po = { poNumber: null, value: null, utilized: null };
  }

  

  projectDetails: any;
  
  budgetChart: any;
  loadProjectDetails() {
    this.http.get<any>('${this.apiUrl}/${this.projectId}')
  .subscribe({
    next: (data) => {
      console.log('Project details fetched successfully:', data);
      this.projectDetails = data; // Assuming you store fetched data
    },
    error: (error) => {
      console.error('Error fetching project details:', error);
    }
  });
  }
  
  createBudgetChart() {
    const utilized = this.projectDetails.utilizedAmount;
    const remaining = this.projectDetails.totalBudget - utilized;

    this.budgetChart = new Chart('budgetChart', {
      type: 'pie',
      data: {
        labels: ['Utilized', 'Remaining'],
        datasets: [{
          data: [utilized, remaining],
          backgroundColor: ['#ff4e00', '#4caf50']
        }]
      }
    });
  }

  editPO(poId: number) {
    // Add logic for editing PO
  }

  deletePO(poId: number) {
    this.http.delete('${this.apiUrl}/${this.projectId}/pos/${poId}').subscribe(() => {
      this.loadProjectDetails(); // Reload the project details after deletion
    });
  }
}  

