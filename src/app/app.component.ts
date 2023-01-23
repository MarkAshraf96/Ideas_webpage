import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/dist/css/bootstrap.min.css',]
})

export class AppComponent {

  constructor(private http: HttpClient) { }

  apiLoaded = false;
  title = 'my-app';
  static videoIndex = 0;
  static displayedVideos: any[any[string]] = [[],[],[],[]];
  data = '';

  ob = {
    enablejsapi: 1,
    cc_load_policy: 1,
    autoplay: 1,
    mute: 1,
   
  };
  
  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    try{
      this.getSheet().subscribe(res => {
                this.data = res
                type ObjectKey = keyof typeof this.data;
                const myVar = 'values' as ObjectKey;
                AppComponent.displayedVideos = Object.values(this.data[myVar]).slice(1)
        
                this.modifyURLs();
              })
              
    }
    catch{
      console.log("Couldn't Retrieve Data")
    }    
  }

  private getSheet(): Observable<any> {
    const sheetid = "1PdOZprSLfRhbrgNKTKFy6FtICpsO3OV9aqUBiBku03E"
    const API_KEY = 'AIzaSyAj-_eAzZPd4FEGX2BuafTUuoGi4ZrMsMA'; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetid}/values/responses?key=${API_KEY}`;
    return this.http.get(url)
  }
   
  get staticDisplayedVideos(){
    return AppComponent.displayedVideos
  }
  get staticVideoIndex(){
    return AppComponent.videoIndex
  }
  private modifyURLs(): void{
    for (let i = 0; i < AppComponent.displayedVideos.length ; i++) {
          
      var indexAND = AppComponent.displayedVideos[i][1].indexOf('&')
                  
      if(indexAND != -1){
        var videoID = AppComponent.displayedVideos[i][1].substring(
          
          AppComponent.displayedVideos[i][1].indexOf('v=') + 2, 
          AppComponent.displayedVideos[i][1].indexOf('&') || AppComponent.displayedVideos[i][1].length -1
          
                        
        );
     

      }
      else{
        var videoID = AppComponent.displayedVideos[i][1].substring(
          
          AppComponent.displayedVideos[i][1].indexOf('v=') + 2, 
          AppComponent.displayedVideos[i][1].length
          
        );
      }
      AppComponent.displayedVideos[i][1] = videoID
      console.log(AppComponent.displayedVideos)
    }
  } 
  player1:any
  player2:any
  player3:any
  player4:any

  onYouTubeIframeOneAPIReady = () => {
    this.player1 = new YT.Player( 'player1', {
      height: '710',
      width: '100%',
      videoId: AppComponent.displayedVideos[AppComponent.videoIndex][1],
      playerVars: this.ob,
      events: { 'onStateChange': this.onPlayerOneStateChange }
    });
    AppComponent.videoIndex += 1
  }


  onYouTubeIframeTwoAPIReady = () => {
    this.player2 = new YT.Player( 'player2', {
      height: '710',
      width: '100%',
      videoId: AppComponent.displayedVideos[AppComponent.videoIndex][1],
      playerVars: this.ob,
      events: { 'onStateChange': this.onPlayerOneStateChange}
    });
    AppComponent.videoIndex += 1
  }
  onYouTubeIframeThreeAPIReady = () => {
    this.player3 = new YT.Player( 'player3', {
      height: '710',
      width: '100%',
      videoId:AppComponent.displayedVideos[AppComponent.videoIndex][1],
      playerVars: this.ob,
      events: { 'onStateChange': this.onPlayerOneStateChange }
    });
    AppComponent.videoIndex += 1
  }
  onYouTubeIframeFourAPIReady = () => {
    this.player4 = new YT.Player( 'player4', {
      height: '710',
      width: '100%', 
      videoId: AppComponent.displayedVideos[AppComponent.videoIndex][1],
      playerVars: this.ob,
      events: { 'onStateChange': this.onPlayerOneStateChange}
    });
    AppComponent.videoIndex += 1
  }

  onPlayerOneStateChange( event: { data: any; target:any; }) {
  
    if(event.data == 0) {
        // var videoIndex = this
        console.log(AppComponent.videoIndex)
        console.log('video ended');
        console.log(event.target)
        event.target.loadVideoById(AppComponent.displayedVideos[AppComponent.videoIndex][1])
        event.target.playVideo()
        switch(event.target['h'].id){
          case 'player1':
            // AppComponent.player1Text!.innerText= AppComponent.displayedVideos[AppComponent.videoIndex][2]
            const player1Text = document.getElementById('player1_text')
            player1Text!.innerHTML = AppComponent.displayedVideos[AppComponent.videoIndex][2]
            break
          case 'player2':
            // AppComponent.player2Text= AppComponent.displayedVideos[AppComponent.videoIndex][2]
            const player2Text = document.getElementById('player2_text')
            player2Text!.innerHTML = AppComponent.displayedVideos[AppComponent.videoIndex][2]
            break
          case 'player3':
            // AppComponent.player3Text = AppComponent.displayedVideos[AppComponent.videoIndex][2]
            const player3Text = document.getElementById('player3_text')
            player3Text!.innerHTML = AppComponent.displayedVideos[AppComponent.videoIndex][2]
              break
          case 'player4':
            // AppComponent.player4Text = AppComponent.displayedVideos[AppComponent.videoIndex][2]
            const player4Text = document.getElementById('player4_text')
            player4Text!.innerHTML = AppComponent.displayedVideos[AppComponent.videoIndex][2]
            break   
        }
        if(AppComponent.videoIndex < AppComponent.displayedVideos.length-1){
          AppComponent.videoIndex = AppComponent.videoIndex + 1
        }
        else{
          AppComponent.videoIndex = 0
        }
    }
    
  }
}


