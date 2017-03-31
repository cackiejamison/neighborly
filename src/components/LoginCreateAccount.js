import React from 'react';
import { inject, observer } from 'mobx-react';
import {Grid, Row } from 'react-bootstrap';
import CreateAccount from './CreateAccount';
import Login from './Login';
import NavBar from './NavBar';

class LoginCreateAccount extends React.Component {

  render() {
    return (
      <div>
        <div>
          <NavBar/>
        </div>
        {this.props.children}
        <div style={{paddingTop:"200px"}}>
          <Grid>
            <Row className="show-grid">
              <Login/>
              <CreateAccount/>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

LoginCreateAccount.propTypes = {
  LoginUser: React.PropTypes.func,
  userStore:  React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("userStore")(observer(LoginCreateAccount));
