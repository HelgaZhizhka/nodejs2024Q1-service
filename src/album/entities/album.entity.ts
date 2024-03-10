import { Album } from '@/album/interface/album.interface';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    const { id, name, year, artistId } = partial;
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
