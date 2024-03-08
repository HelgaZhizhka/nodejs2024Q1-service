import { Track } from "../interface/track.interface";

export class TrackEntity implements Track {
  id: string; 
  name: string;
  artistId: string | null; 
  albumId: string | null; 
  duration: number; 
}
