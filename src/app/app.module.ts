import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostCountComponent } from './post-count/post-count.component';
import { StoreModule } from '@ngrx/store';
import { AppReducers } from './data/reducer';
import { BlogService } from './blog.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, PostsComponent, PostCountComponent, PostDetailComponent],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(AppReducers)],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(blogService: BlogService) {
    blogService.getPosts();
  }
}
