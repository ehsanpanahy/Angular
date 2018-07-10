// Importing Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatToolbarModule, } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import 'hammerjs';

// Importing Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

// Importing Services
import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service'


import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [ DishService,
     PromotionService, LeaderService],
     entryComponents:[
       LoginComponent
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
