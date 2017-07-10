import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClassifyComponent } from './classify/classify.component';
import { AsideComponent } from './aside/aside.component';
import { ClassifyItemComponent } from './classify-item/classify-item.component';
import {FormsModule , ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {ClassifyService} from "./services/classify.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClassifyComponent,
    AsideComponent,
    ClassifyItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ClassifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
