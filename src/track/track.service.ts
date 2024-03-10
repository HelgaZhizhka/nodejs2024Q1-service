import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { Entities } from '@/utils/enums';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interface/track.interface';

@Injectable()
export class TrackService {
  constructor(private db: inMemoryDbService) {}

  create(createTrackDto: CreateTrackDto) {
    const { albumId, artistId } = createTrackDto;

    if (artistId) {
      this.db.findEntityById(artistId, Entities.ARTISTS);
    }

    if (albumId) {
      this.db.findEntityById(albumId, Entities.ALBUMS);
    }

    const id = uuidv4();
    const newTrack: Track = new TrackEntity({
      id,
      ...createTrackDto,
    });
    this.db.addEntity(Entities.TRACKS, newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.getAllEntities(Entities.TRACKS);
  }

  findOne(id: string) {
    return this.db.findEntityById(id, Entities.TRACKS) as Track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const { albumId, artistId, name, duration } = updateTrackDto;
    track.albumId = albumId || track.albumId;
    track.artistId = artistId || track.artistId;
    track.name = name || track.name;
    track.duration = duration || track.duration;
    return track;
  }

  remove(id: string) {
    this.db.removeFromFavorites(id, Entities.TRACKS);
    this.db.removeEntity(id, Entities.TRACKS);
  }

  onAlbumRemove(albumId: string) {
    for (const track of this.db.tracks) {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    }
  }

  onArtistRemove(artistId: string) {
    for (const track of this.db.tracks) {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    }
  }
}
