import { Component, OnInit } from '@angular/core';
import { CustomizeSessionSeriveService } from 'src/app/Services/customize-session-serive.service';

@Component({
  selector: 'app-customize-screen',
  templateUrl: './customize-screen.component.html',
  styleUrls: ['./customize-screen.component.scss']
})
export class CustomizeScreenComponent implements OnInit {
  sessionDataArray: any[] = [];

  constructor(private customizeSessionService: CustomizeSessionSeriveService) { }

  ngOnInit() {
    this.sessionDataArray = this.customizeSessionService.getCustomizeItems();
  }
}
