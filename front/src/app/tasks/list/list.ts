import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to fetch tasks', error);
      }
    });
  }

  applyFilter(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearchTerm = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' ||
                            (this.filterStatus === 'completed' && task.current_status === 'completed') ||
                            (this.filterStatus === 'in_progress' && task.current_status === 'in_progress') || /* 進行中フィルタを追加 */
                            (this.filterStatus === 'active' && task.current_status !== 'completed' && task.current_status !== 'in_progress'); /* 未完了の定義を調整 */
      return matchesSearchTerm && matchesStatus;
    });
  }

  toggleCompleted(task: Task): void {
    task.current_status = task.current_status === 'completed' ? 'in_progress' : 'completed';
    this.taskService.updateTask(task.id!, task).subscribe({
      next: () => {
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to update task', error);
        task.current_status = task.current_status === 'completed' ? 'in_progress' : 'completed';
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.applyFilter();
      },
      error: (error) => {
        console.error('Failed to delete task', error);
      }
    });
  }
}
