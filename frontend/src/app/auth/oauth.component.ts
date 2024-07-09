import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { OAuthService } from "./services/oauth.service";

@Component({
  templateUrl: "./oauth.component.html",
  styleUrls: ["./oauth.component.scss"],
})
export class OAuthComponent implements OnInit {
  user = {};
  stateIsValid = false;
  nonceIsValid = false;

  constructor(
    private oauthService: OAuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {

    const fragment = this.route.snapshot.fragment;
    const urlSearchParams = fragment ? new URLSearchParams(fragment) : null;

    if (urlSearchParams) {
      const idToken = urlSearchParams.get('id_token');
      const state = urlSearchParams.get('state');
      if (idToken) {
        this.user = this.oauthService.decodeIdToken(idToken);
      }
      if (state) {
        this.stateIsValid = this.oauthService.isStateValid(state);
      } else this.stateIsValid = false;
      this.nonceIsValid = this.oauthService.isNonceValid(this.user);
      this.clearAddressBar(); // do not show id_token in the address bar
    } else {
      const idToken = null;
      const state = null;
      this.stateIsValid = false;
      this.nonceIsValid = false;
      this.clearAddressBar(); // do not show id_token in the address bar
    }

    //const fragment = new URLSearchParams(this.route.snapshot.fragment);
    // const idToken = fragment.get("id_token");
    // const state = fragment.get("state");

    // this.user = this.oauthService.decodeIdToken(idToken);
    // this.stateIsValid = this.oauthService.isStateValid(state);
    // this.nonceIsValid = this.oauthService.isNonceValid(this.user);

    // this.clearAddressBar(); // do not show id_token in the address bar
  }

  private clearAddressBar() {
    const pathWithoutHash = this.location.path(false);
    this.location.replaceState(pathWithoutHash);
  }
}
