import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  private client_id;
  private redirect_uri;
  private state;
  private response_type;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // Capture the access token and code
    this.route
      .queryParams
      .subscribe(params => {

        this.client_id = params['client_id'];
        this.redirect_uri = params['redirect_uri'];
        this.state = params['state'];
        this.response_type = params['response_type'];
      });
    // do something with this.code and this.accesstoken
  }

  getTokenFromServer() {

    this.http.get('http://google.com')
      .subscribe(data => {
        // Read the result field from the JSON response.
        console.log("response: ", data['results'])
        // window.location.href = `https://oauth-redirect.googleusercontent.com/r/inzi-quiz-assistant#access_token=${client_id}&token_type=bearer&state=${state}`
      });


  }


}
