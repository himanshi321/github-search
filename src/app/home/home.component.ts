import { Component } from '@angular/core';
import { Item, RepoDetails } from '../models/repo-details';
import { LocalStorageService } from 'angular-2-local-storage';
import { GithubService } from '../services/github.service';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["../../assets/style.css"]
})
export class HomeComponent {
  loadingFlag: boolean;
  city: string = 'BANGALORE';
  favorites: string = 'FAVORITES';
  searchParam: string = 'github-search';
  searchList: Item[] = [];
  favoriteList: Item[] = [];
  repoList: Item[];
  curentPageResponse: RepoDetails;
  pageNo: number = 1;
  repoIdMap:Map<number,Item> =new Map();
  constructor(private service: GithubService,
    public util:UtilService,
    private router: Router,
    public storage: LocalStorageService) {
    this.searchForRepositories(true, false);
  }

  searchForRepositories(showLoader: boolean, loadMore: boolean) {
    if (showLoader)
      this.loadingFlag = true;
    if (this.searchParam && this.searchParam.length > 2 && this.searchParam.trim() != '') {
      this.service.getGithubRepositories(this.searchParam, this.pageNo).subscribe(
        res => {
          if (showLoader) {
            setTimeout(() => {
              this.loadingFlag = false;
            }, 1000);
          }
          this.curentPageResponse = res;
          this.repoList = res.items;
          if (loadMore)
            this.searchList = this.searchList.concat(this.repoList);
          else
            this.searchList = this.repoList;
          this.mapFavoritesToSearchList();
        },
        error => {
          if (showLoader) {
            setTimeout(() => {
              this.loadingFlag = false;
            }, 1000);
          }
        }
      )
    }
  }
  mapFavoritesToSearchList() {
    this.favoriteList = this.storage.get('FAV');
    this.repoMap();
    if (this.searchList.length > 0) {
      this.searchList.forEach(item => {
        if (this.favoriteList && this.favoriteList.length > 0 && this.repoIdMap.has(item.id)) {
          item.favorite = this.repoIdMap.get(item.id).favorite;
        }
      });
    }
  }

  loadMore() {
    this.pageNo = this.pageNo + 1;
    this.searchForRepositories(true, true);
  }

  maintainFavorites(favoriteRepo: Item, ev: Event) {
    this.stopEventPropagation(ev);
    if(!this.favoriteList)
      this.favoriteList = [];
    if (favoriteRepo.favorite && !this.repoIdMap.has(favoriteRepo.id)) {
      this.favoriteList.push(favoriteRepo);
    }
    else if (!favoriteRepo.favorite && this.repoIdMap.has(favoriteRepo.id)) {
      this.favoriteList.splice(this.favoriteList.indexOf(favoriteRepo), 1);
    }
    this.storage.set('FAV', this.favoriteList);
    this.repoMap();
  }

  repoMap() {
    this.repoIdMap.clear();
    if(this.favoriteList && this.favoriteList.length>0) {
      this.favoriteList.forEach(fav => {
        this.repoIdMap.set(fav.id,fav);
      });
    }
  }
  navigateToDetailPage(repo: Item) {
    window.open(repo.clone_url, '_blank');
  }

  getUserName(name: string) {
   return this.util.getUserName(name);
  }

  copyToClipBoard(link: string, ev: Event) {
    this.stopEventPropagation(ev);
    try {
      let ele = document.createElement("input");
      document.body.appendChild(ele);
      ele.setAttribute('value', link);
      ele.select();
      document.execCommand('copy');
      document.body.removeChild(ele);
    } catch (e) {
      this.util.showSnackbar('Error copying');
    }
    this.util.showSnackbar('Link copied to clipboard');
  }


  stopEventPropagation(ev: Event) {
    this.util.stopPropagation(ev);
  }

  navigateToBookmarks() {
    this.router.navigate(['bookmarks']);
  }
}
