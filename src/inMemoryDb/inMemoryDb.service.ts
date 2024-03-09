import { Injectable } from '@nestjs/common';

import { User } from '@/user/interface/user.interface';
import { Album } from '@/album/interface/album.interface';
import { Artist } from '@/artist/interface/artist.interface';
import { Favorite } from '@/favorite/interface/favorite.interface';
import { Track } from '@/track/interface/track.interface';
import { Entities } from '@/utils/enums';

@Injectable()
export class inMemoryDbService {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorite = {
    artists: [],
    tracks: [],
    albums: [],
  };

  checkEntity(entity: Entities): void {
    if (!this[entity]) {
      throw new Error(`Entity ${entity} does not exist`);
    }
  }
}