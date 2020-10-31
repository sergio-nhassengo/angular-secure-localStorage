import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { POSTS } from './data/posts';
import { AppState } from './data/reducer.js';
import { ProvidePosts, DeletePost, ProvidePost } from './data/actions';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private store: Store<AppState>,
    private storageService: StorageService
  ) { }

  post$: Observable<any> = this.store
    .select(s => s.blog)
    .pipe(map(b => b.post));

  posts$: Observable<any[]> = this.store
    .select(s => s.blog)
    .pipe(map(b => b.posts));

  postCount$: Observable<number> = this.posts$.pipe(map(b => b.length));

  getPosts() {
    // Normally we would use the HttpClient to fetch some data and then dispatch it
    this.store.dispatch(ProvidePosts({ posts: POSTS }));
  }

  deletePost(id: number) {
    this.store.dispatch(DeletePost({ id }));
  }

  getPost(id: number) {
    this.store.dispatch(ProvidePost({ id }));
  }

  detailPost(post: any) {
    this.storageService.setData('item', post);
  } 

  getDetailedPost() {
    return this.storageService.getData('item');
  }

  removeDetailedPost() {
    this.storageService.removeData('item');
  }
  
}
