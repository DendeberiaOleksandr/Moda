import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { ClothesDetailsComponent } from './clothes-details/clothes-details.component';
import { ClothesComponent } from './clothes/clothes.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClothesDetailsComponent,
    ClothesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},

        {path: 'clothes', component: ClothesComponent, pathMatch: 'full'}
    ],
      {onSameUrlNavigation: "reload"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
