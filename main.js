document.getElementById('search').addEventListener('click', function(){
    
    const enteredSong = document.getElementById('entered-song').value;
    fetch(`https://api.lyrics.ovh/suggest/${enteredSong}`)
    .then(res => res.json())
    .then(data => {
        
        const searchResultSimple = document.getElementById('search-result-simple');
        searchResultSimple.innerHTML = '';
        const searchResultFancy = document.getElementById('search-result-fancy');
        searchResultFancy.innerHTML = '';
     for (let i = 0; i < 10; i++) {
        const songInfo = data.data[i];
        const songTitle = songInfo.title;
        const artistName = songInfo.artist.name;

        
        searchResultSimple.innerHTML += ` <p class="author lead"><strong id="song-name${i}">${songTitle}</strong> Album by <span id="artist${i}">${artistName}</span> 
        <button onclick="getLyrics('song-name${i}','artist${i}')" id="lyrics-btn${i}" class="btn btn-success">Get Lyrics</button></p>`;

        searchResultFancy.innerHTML += `  <div id='lyrics-display' class="single-result row align-items-center my-3 p-3">
        <div  class="col-md-9">
            <h3 id="song-name${i}" class="lyrics-name">${songTitle}</h3>
            <p class="author lead">Album by <span id="artist${i}">${artistName}</span></p>
        </div>
        <div id='lyrics-area' class="col-md-3 text-md-right text-center">
            <button onclick="getLyricsFancy('song-name${i}','artist${i}')" id="lyrics-btn${i}" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`
         
     }
  
     
    })
   
})



 function getLyrics(songId,artistId){
    const songTitle = document.getElementById(songId).innerText;
    const songArtist = document.getElementById(artistId).innerText;
    document.getElementById('lyrics-header').innerText = songTitle;
    fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
       document.getElementById('main-lyrics').innerText = data.lyrics;
    })
}


function getLyricsFancy(songId,artistId){
    const songTitle = document.getElementById(songId).innerText;
    const songArtist = document.getElementById(artistId).innerText;
    document.getElementById('lyrics-header').innerText = songTitle;
    fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const lyricsArea = document.createElement('div');
        lyricsArea.setAttribute('id','lyrics-area');
      const lyricsField = document.createElement('pre');
        lyricsField.innerHTML = data.lyrics;
        lyricsArea.appendChild(lyricsField);
       document.getElementById('lyrics-display').appendChild(lyricsField);
    })
}
