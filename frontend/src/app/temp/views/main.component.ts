import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';
import { UploadService } from '../../upload.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit, OnDestroy, AfterViewInit{

  // TODO: Task 1
  @ViewChild(WebcamComponent) webcamc!: WebcamComponent;
  width =  400;
  height = 400
  pics: string[] = []
  sub$!: Subscription
  trigger = new Subject<void>;
  
  constructor(private router: Router, private cameraSvc: UploadService){
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }

  ngAfterViewInit(): void {
      this.webcamc.trigger = this.trigger;
      this.sub$ = this.webcamc.imageCapture.subscribe(
        this.snapshot.bind(this)
      )
  }

  snap(){
    this.trigger.next();
  }

  snapshot(webcamImg: WebcamImage){
    this.cameraSvc.imageData = webcamImg.imageAsDataUrl;
    this.pics.push(webcamImg.imageAsDataUrl);
  }


}
