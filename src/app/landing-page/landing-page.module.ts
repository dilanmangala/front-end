import { LandingPageRoutingModule } from './landing-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [
    CommonModule, LandingPageRoutingModule
  ],
  declarations: [LandingPageComponent]
})
export class LandingPageModule { }
