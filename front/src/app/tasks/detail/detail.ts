import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {
  task: Task | undefined;
  taskForm: FormGroup<{
    title: FormControl<string | null>;
    project_name: FormControl<string | null>;
    current_status: FormControl<'unstarted' | 'completed' | 'in_progress' | null>;
    memo: FormControl<string | null>;
  }>;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      project_name: [''],
      current_status: ['unstarted' as 'unstarted' | 'completed' | 'in_progress', Validators.required],
      memo: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.taskService.getTask(+taskId).subscribe({
          next: (task) => {
            this.task = task;
            this.taskForm.patchValue(task);
          },
          error: (error) => {
            console.error('Failed to fetch task', error);
            this.errorMessage = 'タスクの取得に失敗しました。';
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.task) {
      const updatedTask: Task = {
        ...this.task,
        title: this.taskForm.get('title')?.value as string,
        project_name: this.taskForm.get('project_name')?.value as string,
        current_status: this.taskForm.get('current_status')?.value as 'unstarted' | 'completed' | 'in_progress',
        memo: this.taskForm.get('memo')?.value as string
      };

      this.taskService.updateTask(this.task.id!, updatedTask).subscribe({
        next: (response) => {
          console.log('Task updated successfully', response);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'タスクの更新に失敗しました。';
          console.error('Failed to update task', error);
        }
      });
    } else {
      this.errorMessage = '入力内容に不備があります。';
    }
  }

  deleteTask(): void {
    if (this.task && this.task.id) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'タスクの削除に失敗しました。';
          console.error('Failed to delete task', error);
        }
      });
    }
  }
}
