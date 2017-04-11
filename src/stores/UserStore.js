import { extendObservable } from 'mobx';
import {browserHistory} from 'react-router';


export default class UserStore {
  constructor  () {
    extendObservable(this, {
      name: "",
      password: "",
      id: "",
      neighborhood: "",
      admin: false,
      email: "",
      url: "",
      loginMsg: "",
      loggedInUser: false,
      failedLogin: false,
      newUser: false,
      token: "",
      profile: "",
      bio: ""
    });
    this.LoginUser = this.LoginUser.bind(this);
    this.NewUser = this.NewUser.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.facebookLoginUser = this.facebookLoginUser.bind(this);
  }

  setUsers(users) {
    this.users = users;
  }


  NewUser(name, email, password, neighborhood, bio, profile) {
    fetch('/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        neighborhood: neighborhood,
        bio: bio,
        profile: profile
      })
    })
    .then(function(){
      alert ('User Account Created.  Please Log In');
      browserHistory.push('/');
    });
  }

  LoginUser(email, password) {
    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(function(result) {
      return result.json();})
    .then(loginCred => {
      if (loginCred.success && loginCred.token){

        browserHistory.push('/Account');
        this.loggedInUser = true;
        this.email = loginCred.email;
        this.name = loginCred.name;
        this.neighborhood = loginCred.neighborhood;
        this.id = loginCred.id;
        this.token = loginCred.token;
        this.bio = loginCred.bio;
        this.profile = loginCred.profile;

      } else {
        alert("Login Failed");
        this.loggedInUser = false;
        this.newUser = false;
        this.email = "";
      }
    });
  }
  facebookLoginUser(response) {
    const self = this;
    fetch('facebook/usercheck', {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: response.name
      })
    }).then(function(result){
      return result.json();
    }).then(function(result) {
      if(result.userfound) {
        self.LoginUser(response.name, response.id);
      } else {
        this.newUserCreated = true;
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: response.name,
            password: response.id,
            email: response.name
          })
        })
          .then(function(){
            self.LoginUser(response.name, response.id);
          });
      }
    });
  }


}
