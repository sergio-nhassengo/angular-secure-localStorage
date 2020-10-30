import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, 
    {
        path: 'detail',
        component: PostDetailComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        initialNavigation: 'enabled',
        useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }