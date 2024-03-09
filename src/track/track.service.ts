import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { Track } from './interface/track.interface';

@Injectable()
export class TrackService {
  constructor(private db: inMemoryDbService) {}

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const { albumId, artistId } = createTrackDto;
    this.checkAlbum(albumId);
    this.checkArtist(artistId);
    const id = uuidv4();
    const newTrack: Track = new TrackEntity({
      id,
      ...createTrackDto,
    });
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): TrackEntity[] {
    return this.db.tracks;
  }

  findOne(id: string): TrackEntity {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    const { albumId, artistId } = updateTrackDto;
    this.checkAlbum(albumId);
    this.checkArtist(artistId);
    const updatedTrack = { ...track, ...updateTrackDto };
    return updatedTrack;
  }

  remove(id: string) {
    const track = this.findOne(id);
    //TODO remove track from favorites
    const trackIndex = this.db.tracks.indexOf(track);
    this.db.tracks.splice(trackIndex, 1);
  }

  checkAlbum(albumId: string) {
    const isAlbumExists = this.db.albums.some((album) => album.id === albumId);

    if (!isAlbumExists) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  checkArtist(artistId: string) {
    const isArtistExists = this.db.artists.some(
      (artist) => artist.id === artistId,
    );

    if (!isArtistExists) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
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
