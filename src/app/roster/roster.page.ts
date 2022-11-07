import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Student, StudentsService } from '../students.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {
  students: Student[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private studentService: StudentsService) { }

  ngOnInit() {
    this.students = this.studentService.getAll();
  }

  async deleteStudent(student: Student) {
    this.students = this.students
     .filter(x => x.id !== student.id);
 }

 async presentActionSheet(student: Student) {
  const actionSheet = await this.actionSheetController
  .create({
    header: `${student.firstName} ${student.lastName}`,
    buttons: [{
      text: 'Mark Present',
      icon: 'eye',
      handler: () => {
        student.status = 'present';
      }
    }, {
      text: 'Mark Absent',
      icon: 'eye-off-outline',
      handler: () => {
        student.status = 'absent';
      }
    }, {
      text: 'Delete',
      icon: 'trash',
      role: 'destructive',
      handler: () => {
        this.deleteStudent(student);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });

  await actionSheet.present();
}

}
