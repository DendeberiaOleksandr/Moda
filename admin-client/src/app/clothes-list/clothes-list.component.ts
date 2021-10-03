import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ClothesService} from "../clothes.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.css']
})
export class ClothesListComponent implements OnInit {

  @ViewChildren('tableRowElement') rows!: QueryList<any>;

  isCheckboxChecked = false;

  iconDelete = faTrash;

  clothes: any;

  constructor(private clothesService : ClothesService) { }

  ngOnInit(): void {
    this.isCheckboxChecked = false;
    this.clothesService.getClothes().subscribe(c => this.clothes = c);
  }

  onCheckboxClick(): void {
    this.isCheckboxChecked = !this.isCheckboxChecked;
  }

  onDeleteButtonClick(): void {
    console.log(this.rows);

    for(let index = 0; index < this.rows.length; index++){
      let row: ElementRef = this.rows.get(index);
      let cells = row.nativeElement.cells;

      let idCell = cells[0];
      let id = idCell.innerText;

      for(let cell of cells){
        let childNodes = cell.childNodes;

        for(let childNode of childNodes){
          if(childNode.localName === 'input'){
            if(childNode.checked){
              this.clothesService.deleteClothesById(id).subscribe();
            }
          }
        }
      }
      window.location.reload();
    }
  }

}
