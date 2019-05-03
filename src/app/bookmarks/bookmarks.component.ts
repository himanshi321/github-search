import { Component } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";
import { Item } from "../models/repo-details";
import { UtilService } from "../services/util.service";

@Component({
  selector: "app-bookmarks",
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["../../assets/style.css"]
})
export class BookmarksComponent {
  searchList: Item[] = [];
  favoriteList: Item[] = [];

  constructor(public storage: LocalStorageService, public util: UtilService) {
    this.getBookmarks();
  }

  getUserName(name: string) {
    return this.util.getUserName(name);
  }

  getBookmarks() {
    this.searchList = this.storage.get<Item[]>("FAV");
  }

  stopEventPropagation(ev: Event) {
    this.util.stopPropagation(ev);
  }
  removeBookmarks(favoriteRepo: Item, ev: Event) {
    this.stopEventPropagation(ev);
    this.searchList.splice(this.searchList.indexOf(favoriteRepo), 1);
    this.storage.set("FAV", this.searchList);
  }

  navigateToDetailPage(repo: Item) {
    window.open(repo.clone_url, "_blank");
  }

  copyToClipBoard(link: string, ev: Event) {
    this.stopEventPropagation(ev);
    try {
      let ele = document.createElement("input");
      document.body.appendChild(ele);
      ele.setAttribute("value", link);
      ele.select();
      document.execCommand("copy");
      document.body.removeChild(ele);
    } catch (e) {
      this.util.showSnackbar("Error copying");
    }
    this.util.showSnackbar("Link copied to clipboard");
  }
}
