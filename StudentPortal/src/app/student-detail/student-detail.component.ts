import { Component, OnInit } from '@angular/core';
import { Student } from '../classes/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  studentList: Student[] = [];  // Ensure initialized array
  show: boolean = false;
  data: Student = new Student();

  constructor(
    private _service: StudentService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent() {
    this._service.getAllStudent().subscribe(data => {
      console.log("Data from service:", data);
      console.log("Is array?", Array.isArray(data));

      if (data && Array.isArray(data.responseInfo)) {
        this.studentList = data.responseInfo; // ✅ Correct
      } else {
        console.error("Unexpected response format:", data);
        this.studentList = [];
      }
    });
  }

  editStudent(obj: Student): void {
    console.warn('Editing student:', obj);
    this.show = true;
    this.data = { ...obj }; // Make a copy to avoid 2-way binding issues
  }

  removeStudent(id: number): void {
    if (!confirm('Are you sure you want to delete this student?')) return;

    this._service.removeStudent(id).subscribe({
      next: () => {
        console.log(`Student with id ${id} deleted`);
        this.getAllStudent();
        this.show = false;
      },
      error: (err) => console.error('Error deleting student:', err)
    });
  }

  update(obj: Student): void {
    console.warn('Updating student:', obj);
    this._service.saveStudent(obj).subscribe({
      next: () => {
        console.log('Student saved successfully');
        this.getAllStudent();
        this.show = false;
      },
      error: (err) => console.error('Error saving student:', err)
    });
  }

  addStudent(): void {
    this.show = true;
    this.data = new Student();
  }
}
