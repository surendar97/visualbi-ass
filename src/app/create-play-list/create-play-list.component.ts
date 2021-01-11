import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-create-play-list',
  templateUrl: './create-play-list.component.html',
  styleUrls: ['./create-play-list.component.scss']
})
export class CreatePlayListComponent {

  songsList = [];
  filterdSongsList = [];
  searchValue: string;
  playListName: string;
  isAddNewSongs = false;
  playListId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public commonService: CommonService,
    public dialogRef: MatDialogRef<CreatePlayListComponent>) {
    this.commonService.isLoading = true;
    this.playListId = this.data.playListId;
    if (this.playListId) {
      this.getPlayList();
    } else {
      this.getSongsList();
    }
  }

  getPlayList() {
    this.commonService.isLoading = true;
    this.playListName = "Melody";
    this.commonService.getPlayList().subscribe((response: any) => {
      const playLists = response;
      this.songsList = playLists.filter(obj => obj.userId === this.playListId);
      this.songsList.forEach(obj => {
        obj.isAdded = true;
      });
      this.filterdSongsList = this.songsList;
      this.commonService.isLoading = false;
    });
  }

  ShuffleList() {
    for (var i = this.filterdSongsList.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.filterdSongsList[i];
      this.filterdSongsList[i] = this.filterdSongsList[j];
      this.filterdSongsList[j] = temp;
    }
  }

  getSongsList() {
    this.commonService.isLoading = true;
    this.commonService.getSongs().subscribe((response: any) => {
      this.songsList = response;
      this.songsList.forEach(obj => {
        obj.isAdded = false;
      });
      this.filterdSongsList = this.songsList.splice(0, 100);
      this.commonService.isLoading = false;
    });
  }

  searchFilter() {
    this.commonService.isLoading = true;
    this.filterdSongsList = this.songsList;
    this.filterdSongsList = this.filterdSongsList.filter(obj =>
      (obj.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) === 0)).splice(0, 100);
    this.commonService.isLoading = false;
  }

  addAndRemoveList(song) {
    song.isAdded = !song.isAdded;
  }

  addList() {
    this.filterdSongsList = this.filterdSongsList.filter(obj => obj.isAdded === true);
    if (!this.playListName && !this.filterdSongsList.length) {
      this.filterdSongsList = this.songsList.splice(0, 100);
      return;
    }
    const list = {
      playList: this.playListName,
      selectedList: this.filterdSongsList
    }
    localStorage.setItem('playList', JSON.stringify(list));
    if (this.playListId) {
      this.commonService.openSnackBar(`Your playlist ${this.playListName} updated successfully!!!`, '');
    } else {
      this.commonService.openSnackBar(`Your playlist ${this.playListName} created successfully!!!`, '');
    }
    this.dialogRef.close();
  }

}
