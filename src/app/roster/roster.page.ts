import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
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
            this.presentDeleteAlert(student);
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

  async presentDeleteAlert(student: Student) {
    const alert = await this.alertController.create(
      {
        header: 'Delete this student?',
        subHeader:
          `${student.firstName} ${student.lastName}`,
        message: 'This operation cannot be undone.',
        buttons: [
          {
            text: 'Delete',
            handler: () => this.deleteStudent(student)
          },
          {
            text: 'Never mind',
            role: 'cancel'
          }
        ]
      }
    );

    await alert.present();
  }

}
