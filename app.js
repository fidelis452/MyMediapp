const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    //select sounds
    const sounds = document.querySelector('.sound-picker button');
    //display time
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    //key duration for default//fake duration
    let fakeDuration= 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset =outlineLength;
    //pick diff sound
    
    // sounds.forEach(sound => {
    //     sound.addEventListener("click", function() {
    //       song.src = this.getAttribute("data-sound");
    //       video.src = this.getAttribute("data-video");
    //       checkPlaying(song);
    //     });
    //   });

        //add some sound
        //play sound
        play.addEventListener("click", () => {
            checkPlaying(song);
        });
        
        //select sound
        timeSelect.forEach(option => {
        option.addEventListener('click', function(){
         fakeDuration= this.getAttribute('data-time');
         timeDisplay.textContent=`${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60
                )}`; 
          });
        });
        //create a function to stop and play the sound
        const checkPlaying = song => {
            if (song.paused){
                song.play();
                video.play();
                play.src ="./svg/pause.svg";
            }else{
                song.pause();
                video.play();
                play.src="./svg/play.svg";
            };
        };
        //animate the circles
        song.ontimeupdate = () => {
            let currentTime = song.currentTime;
            let elapsed = fakeDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);
            //animate 
            let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;
            //animating the text
            timeDisplay.textContent=`${minutes}:${seconds}`;
            if(currentTime >= fakeDuration){
                song.pause();
                song.currentTime=0;
                play.src = './svg/play.svg';
                video.pause();
            };


        };
};

app();