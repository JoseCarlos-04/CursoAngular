import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customValidatorDate, customValidatorPriority } from './taskform.validators';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-taskform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent {
  formTaskEdit: FormGroup;

  @Input() taskEdit: Task = {} as Task; 
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(formBuilder: FormBuilder){
    this.formTaskEdit = formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]],
      'description': ['', [Validators.required, Validators.maxLength(250)]],
      'priority': ['', [Validators.required, customValidatorPriority()]],
      'expirationDate': ['', [Validators.required, customValidatorDate()]],
    });
  }

  onSubmit(): void {
    if(this.formTaskEdit.valid){
      console.log(this.formTaskEdit.value);

      let newTask = new Task(
        Math.floor(Math.random() * 100000), 
        this.formTaskEdit.value.name,
        this.formTaskEdit.value.description,
        this.formTaskEdit.value.priority,
        TaskStatus.PENDING,
        new Date(),
        new Date(this.formTaskEdit.value.expirationDate),
        false
      );

      console.log('Tarea creada:', newTask);
      this.taskCreated.emit(newTask);
    }else{
      console.log(`El formulario tiene errores ${this.formTaskEdit.errors}`);
    }
  }

  ngOnChanges() {
    if (this.taskEdit) {
      this.formTaskEdit.patchValue({
        name: this.taskEdit.name,
        description: this.taskEdit.description,
        priority: this.taskEdit.priority,
        expirationDate: this.taskEdit.expirationDate
      });
    }
  }

}
