import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AngularFireAuth } from 'angularfire2/auth';


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
    public afAuth: AngularFireAuth
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

    if (this.client_id == '829690274579-j8uaqsstl73qc1mhmofta3d2g5mubjgj.apps.googleusercontent.com' &&
      this.redirect_uri == 'https://oauth-redirect.googleusercontent.com/r/quiz-assistant-59671') {

      this.afAuth.auth.signInWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
        .then(onfulfill => {
          this.afAuth.auth.currentUser.getIdToken(true)
            .then(idToken => {
              console.log("idToken: ", idToken)
              // window.location.href = `https://oauth-redirect.googleusercontent.com/r/inzi-quiz-assistant#access_token=${idToken}&token_type=bearer&state=${this.state}`
              window.location.href = `https://oauth-redirect.googleusercontent.com/r/quiz-assistant-59671?code=${idToken}&state=${this.state}`
            })
        })
    }
    else{
      console.log('Incorrect cliend_id or redirect uri ');
      console.log('client_id ', this.client_id);
      console.log('client_secret ', this.redirect_uri);
    }
  }
}
