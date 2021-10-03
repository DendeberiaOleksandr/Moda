import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ClothesListComponent } from './clothes-list/clothes-list.component';
import { ClothesDetailsComponent } from './clothes-details/clothes-details.component';
import { AddClothesComponent } from './add-clothes/add-clothes.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialogModule} from "@angular/material/dialog";
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClothesListComponent,
    ClothesDetailsComponent,
    AddClothesComponent,
    HeaderComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        {path: 'clothes', component: ClothesListComponent},
        {path: 'clothes/add', component: AddClothesComponent},
        {path: 'clothes/:id', component: ClothesDetailsComponent}
      ],
      {onSameUrlNavigation: "reload"}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
