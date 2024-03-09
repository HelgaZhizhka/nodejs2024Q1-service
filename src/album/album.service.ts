import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interface/album.interface';
import { AlbumEntity } from './entities/album.entity';
import { TrackService } from '@/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private db: inMemoryDbService,
    private trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const { artistId } = createAlbumDto;
    const isAlbumExists = this.db.albums.some(
      (album) => album.artistId === artistId,
    );

    if (isAlbumExists) {
      throw new HttpException('Album already exists', HttpStatus.CONFLICT);
    }

    const id = uuidv4();
    const newAlbum: Album = new AlbumEntity({
      id,
      ...createAlbumDto,
    });
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): AlbumEntity[] {
    return this.db.albums;
  }

  findOne(id: string): AlbumEntity {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const updatedAlbum = { ...album, ...updateAlbumDto };
    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.findOne(id);
    this.trackService.onAlbumRemove(album.id);
    //TODO need delete from favorites
    const albumIndex = this.db.albums.indexOf(album);
    this.db.albums.splice(albumIndex, 1);
  }

  onArtistRemove(artistId: string) {
    for (const album of this.db.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }
}
