use MusicSystem;
create table Playlist(
playlist_id int primary key, 
playlist_name nvarchar(max) not null,
user_id int not null,
song_num int not null
);


create table Playlist_tracks
(
s_no int primary key,
playlist_id int not null,
song_id int not null
)

create table Songs
(
song_id int primary key,
song_name nvarchar(max) not null,
artist_name nvarchar(max) not null,
language_id int not null
)

create table Languages
(
language_id int primary key,
language nvarchar(max) not null
)

create table Likes
(
s_no int primary key,
song_id int not null,
user_id int not null
)

