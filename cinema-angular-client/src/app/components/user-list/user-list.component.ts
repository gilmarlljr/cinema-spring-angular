import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/cinema/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<any>
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe((response)=>{
      this.users = response.data;
    })
  }

}
