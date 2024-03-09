import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interface/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private db: inMemoryDbService) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const newArtist: Artist = new ArtistEntity({
      id: uuidv4(),
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
    const { name, grammy } = updateArtistDto;

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    //TODO need delete album
  }
}
