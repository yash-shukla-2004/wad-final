import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  task = '';
  cnt = 1;
  isEditing = false;
  editId = -1;
  taskList: { id: number; taskName: string }[] = [];
  onAdd() {
    if (this.isEditing) {
      this.taskList.map((item) => {
        if (item.id == this.editId) {
          item.taskName = this.task;
        }
      })
      this.isEditing = false;
      this.editId = -1;
    } else {
      this.taskList.push({ id: this.cnt, taskName: this.task });
      this.task = '';
      this.cnt++;
    }
  }

  edit(taskId: number) {
    this.taskList.map((item) => {
      if (item.id == taskId) {
        this.task = item.taskName;
      }
    });
    this.editId = taskId;
    this.isEditing = true;
  }

  delete(taskId: number) {
    this.taskList = this.taskList.filter((item) => item.id != taskId);
  }
}
