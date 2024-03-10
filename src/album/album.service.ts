import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { TrackService } from '@/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interface/album.interface';
import { AlbumEntity } from './entities/album.entity';
import { Entities } from '@/utils/enums';

@Injectable()
export class AlbumService {
  constructor(
    private db: inMemoryDbService,
    private trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const { artistId } = createAlbumDto;
    if (artistId) {
      this.db.findEntityById(artistId, Entities.ARTISTS);
    }

    const id = uuidv4();
    const newAlbum: Album = new AlbumEntity({
      id,
      ...createAlbumDto,
    });
    this.db.addEntity(Entities.ALBUMS, newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.getAllEntities(Entities.ALBUMS);
  }

  findOne(id: string): AlbumEntity {
    return this.db.findEntityById(id, Entities.ALBUMS) as Album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const { name, year, artistId } = updateAlbumDto;
    album.name = name || album.name;
    album.year = year || album.year;
    album.artistId = artistId || album.artistId;
    return album;
  }

  remove(id: string) {
    this.trackService.onAlbumRemove(id);
    this.db.removeFromFavorites(id, Entities.ALBUMS);
    this.db.removeEntity(id, Entities.ALBUMS);
  }

  onArtistRemove(artistId: string) {
    for (const album of this.db.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }
}
