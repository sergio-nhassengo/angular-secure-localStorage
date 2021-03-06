import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  template: `
    <ul>
      <li *ngFor="let post of posts$ | async">
        {{ post.id }}: {{ post.title }}
        <button (click)="deletePost(post.id)">Apagar</button>
        <button (click)="detailPost(post)">Ver</button>
      </li>
    </ul>
  `,
  styles: []
})
export class PostsComponent {
  posts$ = this.service.posts$;
  constructor(
    private service: BlogService,
    private router: Router
    ) {}

  deletePost(id: number) {
    this.service.deletePost(id);
  }

  detailPost(post: any) {
    this.service.detailPost(post);
    this.router.navigate(['/detail']);
  }
}
