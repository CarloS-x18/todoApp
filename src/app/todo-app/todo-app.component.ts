import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { TaskComplete } from '../interfaces/interfaces';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  todo: string = '';
  todoValid: boolean = false;

  get tasks() {
    return this.todoService.tasks;
  }

  get tasksComplete() {
    return this.todoService.tasksComplete;
  }

  constructor( private todoService: TodoService ) { }

  ngOnInit(): void {
    const tasksLocalStorage = localStorage.getItem('tasks');
    const tasksCompleteLocalStorage = localStorage.getItem('tasksComplete');

    if( tasksLocalStorage ) {
      this.todoService.tasks = JSON.parse(tasksLocalStorage!);
    }

    if(tasksCompleteLocalStorage) {
      this.todoService.tasksComplete = JSON.parse(tasksCompleteLocalStorage!);
    }

  }

  saveTask() {

    if( this.form.invalid ) {
      this.todoValid = true;
      return;
    } else {
      this.todoValid = false;
    }

    this.todoService.tasks.push( this.todo );
    this.todoService.setLocalStorageTasks();

    this.todo = '';

  }

  taskComplete( task: string, i: number ) {
    this.todoService.tasksComplete.push( { task, date: new Date() } );
    this.todoService.setLocalStorageTasksComplete();

    this.todoService.tasks.splice( i, 1 );
    this.todoService.setLocalStorageTasks();
  }

  deleteTask( i:number ) {
    this.todoService.tasks.splice( i, 1 );
    this.todoService.setLocalStorageTasks();
  }

  removeTaskComplete( i: number ) {
    this.todoService.tasksComplete.splice( i, 1 );
    this.todoService.setLocalStorageTasksComplete();
  }

}
