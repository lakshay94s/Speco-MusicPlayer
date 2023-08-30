console.log("Welcome to Speco");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/2.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let masterSongName = document.getElementById("masterSongName");


let songs = [
  { songName: "Amplifier", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"-Imran Khan"},
  { songName: "Statue", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",singer:"-Arjun Kanungo"},
  { songName: "Mi Amor X Bohemia", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",singer:"-Sharn X Bohemia"},
  { songName: "Rim Jhim", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" ,singer:"-Jubin Nautiyal"},
  { songName: "Naagan-Yo Yo HoneySingh", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",singer:"- Honey3.0" },
  { songName: "Kangana Tera Ni", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" ,singer:"-Abeer Arora"},
  { songName: "Jannat Ve", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" ,singer:"-Darshan Raval"},
  { songName: "Ek Tu Hi Toh Hai", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" ,singer:"-Stebin Ben"},
];

songItems.forEach((element, i) => {
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});



//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    // makeAllPause();
    // updateCurrentSongItem();
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-play-circle");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-pause-circle");
   
    
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
    // updateCurrentSongItem();
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("timestamp");
  //update seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  songItemPlay.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

// const makeAllPause = () => {
//     songItemPlay.forEach((element,i) => {
//         if(element.getElementsByClassName("songName")[i].innerText ==masterSongName.innerText){
//         element.classList.remove("fa-play-circle");
//       element.classList.add("fa-pause-circle");}
      
//     });
//   };



songItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    if (audioElement.paused || audioElement.currentTime <= 0){
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName + songs[songIndex].singer;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    }
    else{
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName+ songs[songIndex].singer;
        audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
    }
    
  });
});

////next button logic
document.getElementById("nextPlay").addEventListener("click", () => {
  if (songIndex >= 8) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName+ songs[songIndex].singer;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  makeAllPlays();
  songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-play-circle");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-pause-circle");
});


//////previous button logic
document.getElementById("previousPlay").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex--;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName+ songs[songIndex].singer;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  makeAllPlays();

  songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-play-circle");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-pause-circle");
});
