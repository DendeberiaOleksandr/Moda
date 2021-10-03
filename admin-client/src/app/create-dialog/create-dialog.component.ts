import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle"
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan"

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  iconOk = faCheckCircle;
  iconError = faBan;

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
