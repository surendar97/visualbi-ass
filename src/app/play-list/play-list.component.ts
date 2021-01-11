import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlayListComponent } from '../create-play-list/create-play-list.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent {

  constructor(public commonService: CommonService,
    public dialog: MatDialog) {
    this.getPlayList();
  }
  playLists = [];
  groupedPlayList = [];

  getPlayList() {
    this.commonService.isLoading = true;
    this.commonService.getPlayList().subscribe((response: any) => {
      this.playLists = response;
      this.groupedPlayList = this.playLists.map(obj => obj.userId)
      this.groupedPlayList = this.groupedPlayList.filter((el, i, a) => i === a.indexOf(el));
      this.commonService.isLoading = false;
    });
  }


  createPlayList() {
    const dialogRef = this.dialog.open(CreatePlayListComponent, {
      height: '670px',
      width: '800px',
      data: { playListId: ''}
    });
  }

  editList(list) {
    const dialogRef = this.dialog.open(CreatePlayListComponent, {
      height: '670px',
      width: '800px',
      data: { playListId: list}
    });
  }
}
