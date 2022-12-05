import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Post } from "./post.model";
import { map} from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor (private http: HttpClient, private router: Router){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api.posts')
    .pipe(map((postData) => {
        return postData.posts.map(post => {
          return{
          title: post.title,
          content: post.content,
          contentt: post.contentt,
          id: post._id,
          imagePath: post.imagePath
          };
        });
    }))
    .subscribe((transformedPost)=>{
      this.posts = transformedPost;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostsUpdateListener(){
    return this.postsUpdate.asObservable();
  }

  getPost(id: string){
    //return {...this.posts.find(p => p.id === id)}
    return this.http.get<{_id: string, title: string, content: string,contentt: string, imagePath: string}>('http://localhost:3000/api.posts/' + id);
  }

  addPost(title: string, content: string, contentt: string, image: File){
    const postData = new FormData();
    // const post: Post = {id: null, title: title , content: content}
    postData.append("title",title);
    postData.append("content", content);
    postData.append("contentt", contentt);
    postData.append("image", image);
    
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api.posts', postData)
    .subscribe((responseData) =>{
      //console.log(responseData.message);
      /* const id = responseData.postId;
      post.id = id; */
      const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        contentt: contentt,
        imagePath: responseData.post.imagePath
      };
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
    });

  }

  /* deletePost(id: String){
    this.http.delete('http://localhost:3000/api.posts.eliminar/' + id)

    .subscribe((transformedPost)=>{
      //console.log('Eliminado');
      this.getPosts();
    });
    //window.location.reload();
  } */

  updatePost(id: string, title: string, content: string,contentt: string, image: File | string){
    let postData: Post | FormData;
    if(typeof image === "object"){
        postData = new FormData();
        postData.append("id",id);
        postData.append("title", title);
        postData.append("content",content);
        postData.append("content",contentt);
        postData.append("image",image, title);
    }else{
      const postData = {
        id:id,
        title: title,
        content: content,
        contentt: contentt,
        imagePath: image
      }
    }
    this.http.put("http://localhost:3000/api.posts/" + id, postData).
    subscribe(response => {
      const updatePost = [...this.posts];
      const oldPostIndex = updatePost.findIndex(p => p.id === id);
      const post: Post ={
        id: id,
        title: title,
        content: content,
        contentt: contentt,
        imagePath: ""
      }
      updatePost[oldPostIndex] = post;
      this.posts = updatePost;
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
  });
}

  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api.posts/" + postId)
    .subscribe(()=>{
      const updatePost = this.posts.filter(post => post.id !== postId);
      this.posts = updatePost;
      this.postsUpdate.next([...this.posts]);
    })
  }
}
