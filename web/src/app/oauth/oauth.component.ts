import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  userInfo: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  private client_id;
  private redirect_uri;
  private state;
  private response_type;
  // loginForm = new FormGroup({
  //   'emailFormControl': new FormControl('emailFormControl', [Validators.required, Validators.email]),
  //   'passwordFormControl': new FormControl('passwordFormControl', [Validators.required]),
  // });

  loginForm = new FormGroup({
    emailFormControl: new FormControl()
  });

  ngOnInit() {
    // this.userInfo.email = '';
    // this.userInfo.password = '';

    // Capture the parameters from url query string
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

    console.warn('FORNSSS', this.userInfo);   
    // this.http.get('http://google.com')
    //   .subscribe(data => {
    //     // Read the result field from the JSON response.
    //     console.log("response: ", data['results'])
    //     // window.location.href = `https://oauth-redirect.googleusercontent.com/r/inzi-quiz-assistant#access_token=${client_id}&token_type=bearer&state=${state}`
    //     window.location.href = 'https://youtube.com'
    //   });


  }


}
