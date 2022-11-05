import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBlogsComponent } from './edit-blogs/edit-blogs.component';
import { HomeComponent } from './home/home.component';
import { PostBlogsComponent } from './post-blogs/post-blogs.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'post', component: PostBlogsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
