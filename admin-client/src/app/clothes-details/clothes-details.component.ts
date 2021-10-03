import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClothesService} from "../clothes.service";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Clothes} from "../clothes";
import {CreateDialogComponent} from "../create-dialog/create-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit {

  id: any;
  samePhotoPreview: any;
  clothes: any;
  form: any;

  constructor(private clothesService: ClothesService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.clothesService.getClothesById(id).subscribe(cl => {
      this.clothes = cl;
      this.id = cl.id;

      if (cl.preview === cl.photo){
        this.samePhotoPreview = true;
      }

      this.form = this.formBuilder.group({
        preview: [cl.preview, [Validators.required]],
        photo: [cl.photo, [Validators.required]],
        checkbox: [this.samePhotoPreview],
        cost: [cl.cost, [Validators.required]],
        brand: [cl.brand, [Validators.required]],
        name: [cl.name, [Validators.required]],
        category: [cl.category, [Validators.required]],
        size: this.formBuilder.array([]),
        color: this.formBuilder.array([])
      });

      for(let size of cl.size){
        this.sizeFormArray.push(this.formBuilder.control(size, [Validators.required]));
      }

      for(let color of cl.color){
        this.colorFormArray.push(this.formBuilder.control(color, [Validators.required]));
      }

      }
    );
  }

  get colorFormArray() {
    return this.form.get('color') as FormArray;
  }

  get sizeFormArray() {
    return this.form.get('size') as FormArray;
  }

  onCheckboxChange(event: any): void {
    this.samePhotoPreview = !this.samePhotoPreview;
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

  onSaveButtonClick(): void {
    if(this.samePhotoPreview){
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

      this.clothesService.updateClothes(this.id,
        new Clothes(
        this.id,
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
          data: {status: 'ok', text: 'Edited'}
        });
    }
  }

}
