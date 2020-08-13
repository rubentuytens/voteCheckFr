import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './dashboard/dashboard.component';
import { FormsModule} from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewlistComponent } from './newlist/newlist.component';

@NgModule({
  declarations: [DashboardComponent, NewlistComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [DashboardComponent, NewlistComponent]
})
export class UserModule { }
