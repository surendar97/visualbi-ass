import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {

  throttle = 50;
  scrollDistance = 2;
  songsList = [];
  filterdSongsList = [];
  displayedSongsList = []
  scrollIncrement = 1;
  searchValue: string;

  constructor(public commonService: CommonService) {
    this.getSongsList();
  }

  getSongsList() {
    this.commonService.isLoading = true;
    this.commonService.getSongs().subscribe((response: any) => {
      this.songsList = response;
      this.displayedSongsList = this.songsList;
      this.displayedSongsList = this.displayedSongsList.splice(0, 100);
      this.commonService.isLoading = false;
    });
  }

  searchFilter() {
    this.scrollIncrement = 1;
    if (this.searchValue) {
      this.filterdSongsList = this.songsList.filter(obj =>
        (obj.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) === 0));
      this.displayedSongsList = this.filterdSongsList;
    } else {
      this.displayedSongsList = this.songsList.splice(this.scrollIncrement, this.scrollIncrement * 100);
    }
  }

  onScrollDown() {
    if (this.displayedSongsList.length === this.filterdSongsList.length) {
      return;
    }
    this.scrollIncrement++;
    if (this.searchValue) {
      this.displayedSongsList = this.filterdSongsList.splice(this.scrollIncrement, this.scrollIncrement * 100);
    } else {
      this.displayedSongsList = this.songsList.splice(this.scrollIncrement, this.scrollIncrement * 100);
    }
  }
}
