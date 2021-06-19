import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OutputComponent } from './output/output.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { TopicDisplayComponent } from './topic-display/topic-display.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DescriptionPanelComponent } from './description-panel/description-panel.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    OutputComponent,
    NavbarComponent,
    TopicDisplayComponent,
    DescriptionPanelComponent,
    SelectDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
