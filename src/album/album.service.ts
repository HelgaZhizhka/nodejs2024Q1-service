import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interface/album.interface';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private db: inMemoryDbService) {}

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

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
    const { name, year, artistId } = updateAlbumDto;

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(id: string) {
    const album = this.findOne(id); 
    const albumIndex = this.db.albums.indexOf(album);
    this.db.albums.splice(albumIndex, 1);
  }
}
