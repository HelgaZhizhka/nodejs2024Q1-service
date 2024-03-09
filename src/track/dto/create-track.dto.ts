import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  artistId: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  duration: number;
}
