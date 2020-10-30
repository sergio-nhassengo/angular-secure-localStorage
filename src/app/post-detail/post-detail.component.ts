import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy{
  post: any;

  constructor(private service: BlogService) {
  }

  ngOnInit() {
    this.post = this.service.getDetailedPost();
  }

  ngOnDestroy() {
    this.service.removeDetailedPost()
  }
}