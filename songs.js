var songs = [
    {
        "ID": "1",
        "Title": "Okyanus",
        "Artist": "Şebnem Ferah",
        "Path": "source/ Şebnem Ferah - Okyanus.mp3",
        "photo_path":"images/sebnem_ferah.jpeg",
        "time":"275"
    },
    {
        "ID": "2",
        "Title": "Dream On",
        "Artist": "Aerosmith",
        "Path": "source/Aerosmith - Dream On.mp3",
        "photo_path": "images/aerosmith.jpeg",
        "time":"268"
    },
    {
        "ID": "3",
        "Title": "So Far Away",
        "Artist": "Avenged Sevenfold",
        "Path": "source/Avenged Sevenfold  So Far Away.mp3",
        "photo_path": "images/a7x.jpg",
        "time":"328"

    },
    {
        "ID": "4",
        "Title": "The Thrill Is Gone",
        "Artist": "BB King",
        "Path": "source/BB King  The Thrill Is Gone.mp3",
        "photo_path": "images/bbking.jpg",
        "time":"665"

    },
    {
        "ID": "5",
        "Title": "The Sky Is Crying",
        "Artist": "G. BB Coleman",
        "Path": "source/Gary BB Coleman  - The Sky is Crying.mp3",
        "photo_path": "images/bbcoleman.jpg",
        "time":"553"


    },
    {
        "ID": "6",
        "Title": "Sweet Child O Mine",
        "Artist": "Guns N Roses",
        "Path": "source/Guns N Roses - Sweet Child O Mine.mp3",
        "photo_path": "images/gnr.jpg",
        "time":"303"

    },
    {
        "ID": "7",
        "Title": "Cambaz",
        "Artist": "Mor ve Ötesi",
        "Path": "source/Mor ve Ötesi  - Cambaz.mp3",
        "photo_path": "images/morveotesi.jpeg",
        "time":"231"

    },
    {
        "ID": "8",
        "Title": "Smells Like Teen Spirit",
        "Artist": "Nirvana",
        "Path": "source/Nirvana - Smells Like Teen Spirit Video.mp3",
        "photo_path": "images/nirvana.jpeg",
        "time":"278"

    },
    {
        "ID": "9",
        "Title": "Disturbing The Peace",
        "Artist": "Pentagram aka. Mezarkabul",
        "Path": "source/Pentagram - Disturbing the Peace.mp3",
        "photo_path": "images/pentagram.jpeg",
        "time":"256"

    },
    {
        "ID": "10",
        "Title": "The River Is Rising",
        "Artist": "SMKC",
        "Path": "source/Slash ft Myles Kennedy and The Conspirators - The River Is Rising - .mp3",
        "photo_path": "images/smkc.jpeg",
        "time":"221"

    }
];

var titles = document.getElementsByClassName('title');
var parafs = document.getElementsByClassName('artist');
var images = document.getElementsByClassName('image');
var input = document.querySelector('input');
var songCards = document.getElementsByClassName('song');


var currentSongCover = document.getElementById('currentSongCover');
var btnBack = document.getElementById('back');
var btnPlayPause = document.getElementById('play-pause');
var btnForward = document.getElementById('forward');
var timer = document.getElementById('timer');
var slider = document.getElementById('slider');
var queueButtons = document.getElementsByClassName('add');
var success = document.getElementById('success');

function getTitle(){
    for(let i = 0; i<songs.length;i++){
        titles[i].innerHTML = songs[i].Title;
    }
}

getTitle(); // Şarkı isimlerini çeker.

function getArtist(){
    for(let i = 0;i<songs.length;i++){
        parafs[i].innerHTML = songs[i].Artist;
    }
}

getArtist(); //Şarkı artistlerini çeker

function getPhoto(){
    for(let i = 0;i<songs.length;i++){
        images[i].src = songs[i].photo_path;
    }
}
getPhoto(); // Şarkı kapak fotoğraflarını çeker.

function idForSongCards(){
    for(let i = 0; i<songs.length;i++){
        songCards[i].id = songs[i].ID;
    }
}
idForSongCards(); // Divlere idlerini songs objelerinden çeker.
function search(){
    for(let i = 0; i<songs.length;i++){
        if(!songs[i].Title.toLowerCase().includes(input.value.toLowerCase())){
            songCards[i].style.display = "none";
        }
        if(input.value == ""){
            for (const item of songCards) {
                item.style.display = "flex";
            }
        }
    }
    
}

input.addEventListener('keydown',search) // Inputa tıklanmışken her tuş basıldığında arama metodunu çalıştırır.



// Media Player'a ait tüm fonksiyonlar bu kısımdan itibaren başlamaktadır.
// Stack ve Queue Yapıları da bu kısımda back ve forward butonlarına atanmıştır.

var audio = new Audio();
var audioState = false;
var songStack = [];
var songQueue = [];

function playPause(){
    if(audioState){
        audio.pause();
        audioState = false;
    }else{
        audio.play();
        audioState = true;
    }
}


function changePlayPauseIcon(){
    if(audioState){
        btnPlayPause.innerHTML = "<i class=\"fas fa-pause\"></i>";
    }else{
        btnPlayPause.innerHTML = "<i class=\"fas fa-play\"></i>";
    }
}




for (const item of songCards) {
    item.addEventListener('click',()=>{
        for (const x of songs) {
            if(x.ID == item.id){
                // Tıklanan şarkının fotoğrafını getirir.
                currentSongCover.style.display = "initial";
                currentSongCover.src = x.photo_path;
                //
                audio.src = x.Path;
                audio.play();
                audioState = true;
                changePlayPauseIcon();
                if(!songStack.includes(x)){
                    songStack.push(x);
                }
                changeTitle(x);
                getTime(x);
            }
        }
    })
    
}
function changeTitle(item){
    document.title = item.Title + " | " + item.Artist;
}
function playPauseWrapper(){
    playPause();
    changePlayPauseIcon();
}
function backStack(){
    let song = songStack.pop();
    currentSongCover.src = song.photo_path;
    audio.src = song.Path;
    audio.play();
    changeTitle(song)
    getTime(song);
}
function getTime(songObject){
    let convertedSecond = Number.parseInt(songObject.time);
    let minute = Math.floor(convertedSecond/60);
    let second = convertedSecond - minute * 60;
    if(second < 10){
        second = "0"+second;
    }
    timer.innerHTML = minute + ":" + second;

}
function forwardQueue(){
    let song = songQueue.shift();
    currentSongCover.src = song.photo_path;
    audio.src = song.Path;
    audio.play();
    changeTitle(song);
    getTime(song);
}

for (const item of queueButtons) {
    item.addEventListener('click',(e)=>{
        e.stopPropagation();
        for (const member of songs) {
            if(member.ID == item.id){
                songQueue.push(member);
            }
        }
        success.style.display = "flex";
        
        success.addEventListener('animationend',()=>{
            success.style.display = "none";
        })
    })
}



btnForward.addEventListener('click',forwardQueue);
btnPlayPause.addEventListener('click', playPauseWrapper);
btnBack.addEventListener('click',backStack);

document.addEventListener('keydown',(e)=>{
    if(e.code === "Space"){
        if(songStack.length !== 0){
            playPauseWrapper();
        }
    }
})