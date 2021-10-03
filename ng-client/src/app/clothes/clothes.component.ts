import { Component, OnInit } from '@angular/core';
import {ClothesService} from "../clothes.service";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  clothes: any;

  constructor(private clothesService: ClothesService) { }

  ngOnInit(): void {
    this.clothesService.getClothes().subscribe(c => {
      this.clothes = c;
    });
  }

}
