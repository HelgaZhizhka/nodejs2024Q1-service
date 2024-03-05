import { Injectable } from '@nestjs/common';
import { User } from '@/user/interface/user.interface';
import { Album } from '@/album/interface/album.interface';
import { Artist } from '@/artist/interface/artist.interface';
import { Favorite } from '@/favorite/interface/favorite.interface';
import { Track } from '@/track/interface/track.interface';

export const enum DbTable {
  USERS = 'users',
  ALBUMS = 'albums',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
}

@Injectable()
export class DbService {
  users: User[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  favs: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
