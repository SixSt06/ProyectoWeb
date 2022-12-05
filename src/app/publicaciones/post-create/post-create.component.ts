import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { ViewChild} from '@angular/core';
import { mimeType } from "./mime-type.validator";



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})

/* export class PostCreateComponent{

  newPost = 'NO HAY POST'; //Declaracion de variable vacia

  onAddPost(postInput: HTMLTextAreaElement){
    this.newPost = postInput.value;
  }
} */
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  enteredContentt = '';
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;


  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    /* window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  }); */

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      contentt: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });



    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        //this.post = this.postsService.getPost(this.postId);
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            contentt: postData.contentt,
            imagePath: postData.imagePath
          };

          this.imagePreview = postData.imagePath;
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            contentt: this.post.contentt,
            image: this.imagePreview
          });
          console.log(this.imagePreview);


        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);

  }

  onSavePost() {
    /* if(this.form.invalid){
      return
    } */
    this.isLoading = true;
    if (this.mode == 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.contentt,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.contentt,
        this.form.value.image
      );

    }

    this.form.reset();
  }
}
