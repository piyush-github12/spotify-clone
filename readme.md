user music sun sake
user music like kr sake
user playlist create karega
user playlist me songs add kr sake
search songs

UserSchema
    username
    email
    contact
    playlists[ playlistId ]
    liked[]
    profileImage
    password
    isAdmin : true,false

songs
    title
    artist
    category[]
    likes[]
    size
    poster

playlistsSchema:
    name
    owner (userID)
    songs[ songsId ]
    poster


playlistCreate
user know the playlist
songs added check ,if already then remove from playlist

if admin then upload Music
user can listen now
play/pause
next / previous  
skip 10sec
add on playlist
loop
shuffle
searching
lke , if already likes then remove like
suggestions


user
    register/login/logout  default playlist assign
    playlist / add new song / remove
    song like
    search songs
    song play#   s p o t i f y - c l o n e 
 
 #   s p o t i f y - c l o n e 
 
 



var items = [1, 2, 3, 4, 5,7,7,4,9,34,5,22,1,22,34,5,66,57];
var newItems = [];

for (var i = 0; i < 10; i++) {
  var idx = Math.floor(Math.random() * items.length);
  newItems.push(items[idx]);
  // items.splice(idx, 1);
}

console.log(newItems);
console.log(items)