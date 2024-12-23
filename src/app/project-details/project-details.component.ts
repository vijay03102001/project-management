import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-project-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {  // Rename class to match the import
  poList: any[] = []; // Array to store PO details
  newPO = {
    poNumber: 0,
    value: 0,
    utilized: 0,
  };

  editIndex: number | null = null; // Index to track the row being edited

  // Create or Update PO
  addOrUpdatePO() {
    if (this.newPO.utilized <= this.newPO.value) {
      if (this.editIndex === null) {
        // Add new PO
        this.poList.push({ ...this.newPO });
      } else {
        // Update existing PO
        this.poList[this.editIndex] = { ...this.newPO };
        this.editIndex = null; // Reset edit mode
      }
      this.resetForm();
    } else {
      alert('Utilized value cannot exceed the total value!');
    }
  }

  // Edit an existing PO
  editPO(index: number) {
    this.newPO = { ...this.poList[index] }; // Copy data into the form
    this.editIndex = index; // Set the edit index
  }

  // Delete a PO
  deletePO(index: number) {
    if (confirm('Are you sure you want to delete this PO?')) {
      this.poList.splice(index, 1);
    }
  }

  // Reset the form fields
  resetForm() {
    this.newPO = { poNumber: 0, value: 0, utilized: 0 };
    this.editIndex = null;
  }
}
