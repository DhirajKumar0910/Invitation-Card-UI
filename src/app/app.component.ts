import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Invitation-Card';
  logInTitle = 'Login';
  userName = ""


  ngOnInit(){
      // 
  }

  login() {
    this.userName = 'Dhiraj';
    this.logInTitle = 'Welcome ' + this.userName;
  }
}
