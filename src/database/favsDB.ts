import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
@Injectable()
export class FAVSDB {
  private artists: Artist[];
  private tracks: Track[];
  private albums: Album[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
  addArtist(item: Artist) {
    this.artists.push(item);
  }
  addTrack(item: Track) {
    this.tracks.push(item);
  }
  addAlbum(item: Album) {
    this.albums.push(item);
  }

  getFavArtist() {
    return this.artists;
  }
  getFavTracks() {
    return this.tracks;
  }
  getFavAlbums() {
    return this.albums;
  }

  findArtist(id: string) {
    return this.artists.find((a) => a.id === id);
  }
  findTrack(id: string) {
    return this.tracks.find((a) => a.id === id);
  }
  findAlbum(id: string) {
    return this.albums.find((a) => a.id === id);
  }

  deleteArtist(id: string) {
    const index = this.artists.findIndex((a) => a.id === id);
    if (index < 0) return false;
    this.artists.splice(index, 1);
    return true;
  }
  deleteTrack(id: string) {
    const index = this.tracks.findIndex((a) => a.id === id);
    if (index < 0) return false;
    this.tracks.splice(index, 1);
    return true;
  }
  deleteAlbum(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index < 0) return false;
    this.albums.splice(index, 1);
    return true;
  }
}

