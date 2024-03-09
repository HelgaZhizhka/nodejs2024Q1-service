import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { AlbumService } from '@/album/album.service';
import { TrackService } from '@/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private db: inMemoryDbService, private trackService: TrackService, private albumService: AlbumService) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const id = uuidv4();
    const newArtist: Artist = new ArtistEntity({
      id,
      ...createArtistDto,
    });
    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistEntity[] {
    return this.db.artists;
  }

  findOne(id: string): ArtistEntity {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const artist = this.findOne(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    return updatedArtist;
  }

  remove(id: string) {
    const artist = this.findOne(id);
    this.trackService.onAlbumRemove(id);
    this.albumService.onArtistRemove(id);
    //TODO need delete album from favorites

    const artistIndex = this.db.artists.indexOf(artist);
    this.db.artists.splice(artistIndex, 1);
  }
}
