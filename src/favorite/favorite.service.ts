import { Injectable, Scope } from '@nestjs/common';

import { inMemoryDbService } from '../inMemoryDb/inMemoryDb.service';
import { Entities } from '../utils/enums';
import { Favorite } from './interface/favorite.interface';

@Injectable({ scope: Scope.DEFAULT })
export class FavoriteService {
  constructor(private db: inMemoryDbService) {}

  findAll(): Favorite {
    const favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    this.db.favorites.artists.forEach((id) => {
      const artist = this.db.artists.find((artist) => artist.id === id);
      if (artist) {
        favorites.artists.push(artist);
      }
    });

    this.db.favorites.albums.forEach((id) => {
      const album = this.db.albums.find((album) => album.id === id);
      if (album) {
        favorites.albums.push(album);
      }
    });

    this.db.favorites.tracks.forEach((id) => {
      const track = this.db.tracks.find((track) => track.id === id);
      if (track) {
        favorites.tracks.push(track);
      }
    });

    return favorites;
  }

  private addToFavorites(id: string, entity: Entities) {
    this.db.addToFavorites(id, entity);
  }

  private removeFromFavorites(id: string, entity: Entities) {
    this.db.removeFromFavorites(id, entity);
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
