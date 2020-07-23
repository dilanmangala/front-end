import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
const route: Routes = [
  {
    path: 'landing-page',
    component: LandingPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route),
    CommonModule
  ],
  declarations: [], entryComponents: [LandingPageComponent]
})
export class LandingPageRoutingModule { }
