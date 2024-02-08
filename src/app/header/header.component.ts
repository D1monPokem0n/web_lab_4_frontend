import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName?: string;

  constructor(private keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.keycloak
      .loadUserProfile()
      .then((profile) => (this.userName = profile.username));
  }

  logout(): void {
    this.keycloak.logout();
  }
}
