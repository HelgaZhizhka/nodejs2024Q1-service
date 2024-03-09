import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { Entities } from '@/utils/enums';
import { Favorite } from './interface/favorite.interface';
import { Track } from '@/track/interface/track.interface';
import { Artist } from '@/artist/interface/artist.interface';
import { Album } from '@/album/interface/album.interface';
import { User } from '@/user/interface/user.interface';

type DbEntity = User | Album | Artist | Track;

@Injectable()
export class FavoriteService {
  constructor(private db: inMemoryDbService) {}

  findAll() {
    const favorites: Favorite = {
      artists: [],
      albums: [],
      tracks: [],
    };
    Object.keys(this.db.favorites).forEach((entity) => {
      favorites[entity] = this.db.favorites[entity].map((id) => {
        return this.db[entity].find((item) => item.id === id);
      });
    });
    return favorites;
  }

  private addToFavorites(id: string, entity: Entities) {
    const item = (this.db[entity] as DbEntity[]).find((item) => item.id === id);

    if (!item) {
      throw new HttpException(
        `${entity} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (this.db.favorites[entity].includes(id)) {
      return { message: `${entity} is already in favorites` };
    }

    this.db.favorites[entity].push(id);
    return { message: `${entity} added to favorites` };
  }

  private removeFromFavorites(id: string, entity: Entities) {
    const itemIndex = this.db.favorites[entity].indexOf(id);

    if (itemIndex === -1) {
      throw new HttpException(
        `${entity} not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.favorites[entity].splice(itemIndex, 1);
    return { message: `${entity} removed from favorites` };
  }

  addArtist(id: string) {
    return this.addToFavorites(id, Entities.ARTISTS);
  }

  removeArtist(id: string) {
    return this.removeFromFavorites(id, Entities.ARTISTS);
  }

  addAlbum(id: string) {
    return this.addToFavorites(id, Entities.ALBUMS);
  }

  removeAlbum(id: string) {
    return this.removeFromFavorites(id, Entities.ALBUMS);
  }

  addTrack(id: string) {
    return this.addToFavorites(id, Entities.TRACKS);
  }

  removeTrack(id: string) {
    return this.removeFromFavorites(id, Entities.TRACKS);
  }
}
