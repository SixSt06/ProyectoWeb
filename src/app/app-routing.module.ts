import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SigninComponent } from './login/signin.component';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { StopWatchComponent } from './stopwatch/stopwatch.component';

const routes: Routes = [
  {path: 'banner', component: BannerComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
  {path: 'stopwatch', component: StopWatchComponent},
  {path: 'list', component: PostListComponent},
  {path: '', component: SigninComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
