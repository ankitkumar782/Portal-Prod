import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { DatePipe } from '@angular/common'
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchFilterPipe  } from '../Allpipes/airport-filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SearchFilterPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatOptionModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    SearchFilterPipe,
    MatProgressSpinnerModule,


  ],
  providers: [DatePipe]
})
export class FormShareModule { }
