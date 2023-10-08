import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private feedbackData: any; // Replace 'any' with the actual type of your data
  private editStatus: boolean=false;

  setFeedbackData(data: any) {
    this.feedbackData = data;
  }

  getFeedbackData() {
    console.log('something', this.feedbackData);
    return this.feedbackData;
  }

  setEditStatus(status:boolean)
  {
    this.editStatus = status;
  }

  getEditStatus()
  {
    return this.editStatus;
  }
}
