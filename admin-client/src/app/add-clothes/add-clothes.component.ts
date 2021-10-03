import { Component, OnInit } from '@angular/core';
import {ClothesService} from "../clothes.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Clothes} from "../clothes";
import {MatDialog} from "@angular/material/dialog";
import {CreateDialogComponent} from "../create-dialog/create-dialog.component";

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css']
})
export class AddClothesComponent implements OnInit {

  checkboxChecked:any;
  createdSuccessfully:any;

  form = this.formBuilder.group({
    preview: ['', Validators.required],
    photo: ['', Validators.required],
    cost: ['', Validators.required],
    brand: ['', Validators.required],
    checkbox: [''],
    name: ['', Validators.required],
    category: ['', Validators.required],
    size: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required,
        Validators.pattern(/[0-9\/.]+/)])
    ]),
    color: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required,
        Validators.pattern(/[a-zA-Z\-]+/)])
    ])
  });

  get colorFormArray() {
    return this.form.get('color') as FormArray;
  }

  get sizeFormArray() {
    return this.form.get('size') as FormArray;
  }

  constructor(private clothesService: ClothesService,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.checkboxChecked = false;
    this.createdSuccessfully = false;
  }

  onCheckboxChange(event: any): void {
    this.checkboxChecked = !this.checkboxChecked;
  }

  onAddButtonClick(event: any): void {

    let target = event.target;

    if(target){
      let targetId = target.id;

      switch (targetId){
        case "add-size":
          this.sizeFormArray.push(this.formBuilder.control([''],
            [Validators.required, Validators.pattern(/[0-9\/.]+/)]));
          break;

        case "add-color":
          this.colorFormArray.push(this.formBuilder.control([''],
            [Validators.required, Validators.pattern(/[a-zA-Z\-]+/)]));
          break;
      }

    }
  }

  onInputBlur(event: any): void {
    let target = event.target;

    if(target){

      let targetId = target.id;
      let targetIndex = +targetId.replace(/[^0-9]+/, '');
      let colorMatch = targetId.match(/^color.+/);

      let targetValue = target.value;

      if(!targetValue){

        if(colorMatch){
          if(this.colorFormArray.length > 1){
            this.colorFormArray.removeAt(targetIndex);
          }
        } else {
          if(this.sizeFormArray.length > 1){
            this.sizeFormArray.removeAt(targetIndex);
          }
        }

      }

    }
  }

  onButtonCreateClick(): void {

    if(this.checkboxChecked){
      this.form.controls['photo'].setValue(this.form.controls['preview'].value, []);
    }

    if(this.form.status === 'VALID'){

      let preview = this.form.controls['preview'].value;
      let photo = this.form.controls['photo'].value;
      let cost = this.form.controls['cost'].value;
      let brand = this.form.controls['brand'].value;
      let name = this.form.controls['name'].value;
      let category = this.form.controls['category'].value;
      let size = this.sizeFormArray.getRawValue();
      let color = this.colorFormArray.getRawValue();

      this.clothesService.saveClothes(new Clothes(
        null,
        preview,
        photo,
        cost,
        brand,
        name,
        category,
        size,
        color,
        null
      )).subscribe();

      this.matDialog.open(CreateDialogComponent,
        {
          width: '200px',
          height: '100px',
          data: {status: 'ok', text: 'Created'}
        });
    }

  }





}
