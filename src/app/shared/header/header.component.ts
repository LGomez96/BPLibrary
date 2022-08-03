import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../auth/services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username = this.loginService.user.username;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
