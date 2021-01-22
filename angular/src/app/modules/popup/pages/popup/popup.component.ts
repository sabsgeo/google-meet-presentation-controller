import { Component, Inject, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from '../../../../providers/tab-id.provider';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent implements OnInit {
  message: string;
  isMeetLink = false;
  isConnectedToServer = false;

  constructor(@Inject(TAB_ID) readonly tabId: number) { }

  async ngOnInit() {

    this.isConnectedToServer = await bindCallback<any>(chrome.runtime.sendMessage.bind(this, { action: "isConnectedToServer" }))().pipe(
      map(response => {
        return response.status
      })
    ).toPromise(); 

    this.isMeetLink = await bindCallback<string>(chrome.tabs.sendMessage.bind(this, this.tabId, 'get-url'))()
      .pipe(
        map(msg => {

          if (chrome.runtime.lastError) {
            return false;
          } else {
            if (msg.indexOf('://meet.google.com/') > -1) {
              return true
            } else {
              return false;
            }
          }
        }
        ))
      .toPromise();
  }

  async connectToServer(): Promise<void> {
    this.isConnectedToServer = await bindCallback<any>(chrome.runtime.sendMessage.bind(this, { action: "connectToServer" }))().pipe(
      map(response => {
        if (response.status === 'success') {
          return true
        } else{
          return false;
        }
      })
    ).toPromise();
  }

  async disconnectFromServer(): Promise<void> {
    this.isConnectedToServer = await bindCallback<any>(chrome.runtime.sendMessage.bind(this, { action: "disconnectFromServer" }))().pipe(
      map(response => {
        if (response.status === 'success') {
          return false
        } else{
          return true;
        }
      })
    ).toPromise(); 
  }
}
