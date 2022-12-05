import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatProgressSpinnerModule} from  '@angular/material/progress-spinner'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { PostService } from './publicaciones/post.service';
import {HttpClientModule} from '@angular/common/http'
import { StopWatchComponent } from './stopwatch/stopwatch.component';
import { BannerComponent } from './banner/banner.component';
import { SigninComponent } from './login/signin.component'; 
import { LoginService } from './register/login.service';



@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    StopWatchComponent,
    BannerComponent,
    SigninComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [PostService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
