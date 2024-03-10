import { Injectable, HttpException, HttpStatus, Scope } from '@nestjs/common';
import { User } from '@/user/interface/user.interface';
import { Album } from '@/album/interface/album.interface';
import { Artist } from '@/artist/interface/artist.interface';
import { Favorite } from '@/favorite/interface/favorite.interface';
import { Track } from '@/track/interface/track.interface';
import { Entities } from '@/utils/enums';

type DbEntity = User | Album | Artist | Track;

@Injectable({ scope: Scope.DEFAULT })
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

  addEntity(entity: Entities, newEntity: DbEntity) {
    (this[entity] as DbEntity[]).push(newEntity);
  }

  getAllEntities(entity: Entities): DbEntity[] {
    return this[entity] as DbEntity[];
  }

  findEntityById(id: string, entity: Entities) {
    const item = (this[entity] as DbEntity[]).find((item) => item.id === id);
    
    if (!item) {
      throw new HttpException(`${entity} with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return item;
  }

  removeEntity(id: string, entity: Entities) {
    const index = (this[entity] as DbEntity[]).findIndex(
      (item) => item.id === id,
    );

    if (index === -1) {
      throw new HttpException(
        `${entity} with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this[entity].splice(index, 1);
  }

  addToFavorites(id: string, entity: Entities) {
    const isExists = this.isExists(entity, id);

    if (!isExists) {
      throw new HttpException(
        `${entity} with ${id} not found in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!this.favorites[entity].includes(id)) {
      this.favorites[entity].push(id);
    }
  }

  removeFromFavorites(id: string, entity: Entities) {
    this.favorites[entity] = this.favorites[entity].filter(
      (item) => item !== id,
    );
  }

  isExists(entity: Entities, id: string) {
    const isExists = this[entity].some((item) => item.id === id);
    return isExists;
  }
}
