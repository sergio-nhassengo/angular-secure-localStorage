import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { POSTS } from './data/posts';
import { AppState } from './data/reducer.js';
import { ProvidePosts, DeletePost, ProvidePost } from './data/actions';
import { LocalService } from './local.service';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  encryptSecretKey = "123456789";

  constructor(
    private store: Store<AppState>,
    private localService: LocalService
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
    let data = JSON.stringify(post);
    let encrypted = this.encryptData(data);

    console.log("Encrypted");
    console.log(encrypted);

    localStorage.setItem('item', encrypted);
  }

  getDetailedPost() {
    let data = localStorage.getItem('item');
    let decrypted = JSON.parse(this.decryptData(data));
    
    console.log("Decrypted");
    console.log(decrypted);

    return decrypted;
  }

  removeDetailedPost() {
    localStorage.removeItem('item');
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
