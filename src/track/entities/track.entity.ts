import { Track } from '@/track/interface/track.interface';

export class TrackEntity implements Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<Track>) {
    const { id, name, artistId, albumId, duration } = partial;
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
