import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AppComponent {
  taskText: string = '';
  tasks: string[] = [];
  editIndex: number = -1;

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (!this.taskText.trim()) return;

    if (this.editIndex === -1) {
      this.tasks.push(this.taskText.trim());
    } else {
      this.tasks[this.editIndex] = this.taskText.trim();
      this.editIndex = -1;
    }

    this.taskText = '';
    this.saveToLocalStorage();
  }

  editTask(index: number) {
    this.taskText = this.tasks[index];
    this.editIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);

    if (this.editIndex === index) {
      this.taskText = '';
      this.editIndex = -1;
    }

    this.saveToLocalStorage();
  }

}
