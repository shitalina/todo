import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
import { Task } from '../../models/task';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create implements OnInit {
  taskForm: FormGroup<{
    title: FormControl<string | null>;
    project_name: FormControl<string | null>;
    current_status: FormControl<'unstarted' | 'completed' | 'in_progress' | null>;
    memo: FormControl<string | null>;
  }>;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      project_name: [''],
      current_status: ['unstarted' as 'unstarted' | 'completed' | 'in_progress', Validators.required], // ここでキャスト
      memo: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: 0, // IDはバックエンドで生成されるため仮の値
        user_id: 0, // ユーザーIDはバックエンドで設定されるため仮の値
        title: this.taskForm.get('title')?.value as string,
        project_name: this.taskForm.get('project_name')?.value as string,
        current_status: this.taskForm.get('current_status')?.value as 'unstarted' | 'completed' | 'in_progress',
        memo: this.taskForm.get('memo')?.value as string
      };

      this.taskService.createTask(newTask).subscribe({
        next: (response) => {
          console.log('Task created successfully', response);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'タスクの作成に失敗しました。';
          console.error('Failed to create task', error);
        }
      });
    } else {
      this.errorMessage = '入力内容に不備があります。';
    }
  }
}
