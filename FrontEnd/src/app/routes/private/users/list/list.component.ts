import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserControllerService } from 'src/app/shared/sdk';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private readonly userService: UserControllerService,
  ) {
    this.users$ = this.userService.userControllerFind();
  }

  ngOnInit(): void {
  }

}
