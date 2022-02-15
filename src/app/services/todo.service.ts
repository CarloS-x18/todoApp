import { Injectable } from '@angular/core';
import { TaskComplete } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tasks: string[] = [];
  tasksComplete: TaskComplete[] = [];

  constructor() { }

  setLocalStorageTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  setLocalStorageTasksComplete() {
    localStorage.setItem('tasksComplete', JSON.stringify(this.tasksComplete));
  }

}
