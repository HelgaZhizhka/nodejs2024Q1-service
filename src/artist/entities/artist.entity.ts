import { Artist } from "@/artist/interface/artist.interface";

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    const { id, name, grammy } = partial;
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
