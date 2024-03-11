import { Injectable } from '@nestjs/common';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { AlbumService } from '@/album/album.service';
import { TrackService } from '@/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { Artist } from './interface/artist.interface';
import { Entities } from '@/utils/enums';

@Injectable()
export class ArtistService {
  constructor(
    private db: inMemoryDbService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    const newArtist: Artist = new ArtistEntity({
      ...createArtistDto,
    });
    this.db.addEntity(Entities.ARTISTS, newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.getAllEntities(Entities.ARTISTS);
  }

  findOne(id: string): ArtistEntity {
    return this.db.findEntityById(id, Entities.ARTISTS) as Artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    const artist = this.findOne(id);
    const { name, grammy } = updateArtistDto;
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  remove(id: string) {
    this.albumService.onArtistRemove(id);
    this.trackService.onArtistRemove(id);
    this.db.removeFromFavorites(id, Entities.ARTISTS);
    this.db.removeEntity(id, Entities.ARTISTS);
  }
}
