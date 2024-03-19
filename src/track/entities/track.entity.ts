import { v4 as uuidv4 } from 'uuid';

import { Track } from '../../track/interface/track.interface';

export class TrackEntity implements Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<Track>) {
    const { name, artistId, albumId, duration } = partial;
    this.id = uuidv4();
    this.name = name;
    this.artistId = artistId ? artistId : null;
    this.albumId = albumId ? albumId : null;
    this.duration = duration;
  }
}
