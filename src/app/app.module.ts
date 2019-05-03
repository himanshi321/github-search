import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoadingModule } from "ngx-loading";
import { GithubService } from './services/github.service';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { UtilService } from './services/util.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookmarksComponent,
  ],
  imports: [
    BrowserModule,
    LoadingModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LocalStorageModule.forRoot({
      prefix: 'GITHUB',
      storageType: 'localStorage'
  }),
  ],
  providers: [GithubService,UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
