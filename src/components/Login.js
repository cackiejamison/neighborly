import React from 'react';
import { inject, observer } from 'mobx-react';
import { Jumbotron, Button, Grid } from 'react-bootstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../../public/style.css';
import { Link } from 'react-router';
import { Flex, Box } from 'reflexbox';
import Navigation from './Navigation';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      admin: false,
      email: "",
      loginMsg: "",
      neighborhood: "",
      name: "",
      owner: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleNeighborhoodChange = this.handleNeighborhoodChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handleLoginUser(event) {
    event.preventDefault();
    this.props.userStore.LoginUser(this.state.email, this.state.password);
    this.setState({email: "", password: ""});
  }
  handleNeighborhoodChange(e) {
    this.setState({neighborhood: e.target.value});
  }
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  loginMsg() {
    if(this.props.userStore.failedLogin){
      return (<h5 style={{color: "red"}}>Incorrect username or password.  Please try again</h5>);}
    else if(this.props.userStore.newUser){
      return (<h5 style={{color: "green"}}>New User Created! Feel free to login</h5>);}
  }
  handleNewUser(event) {
    event.preventDefault();
    this.props.userStore.NewUser(this.state.email, this.state.password, this.state.name,
      this.state.neighborhood, this.state.owner);
    this.setState({ password: "", email: "", name: "", neighborhood: "", owner: ""});
  }
  responseFacebook(response){
    this.props.userStore.facebookLoginUser(response);
  }
  render() {
    return (
      <div>
        <div><Navigation/></div>
        <div id="loginDiv">
          <Grid>
            <Flex align="center" justify="center">
              <Jumbotron id="loginJumbo">
                <Flex align="center" justify="center">
                  <Form id="loginForm">
                    <span id="spanLogin">{this.state.loginMsg == "" ?
                     "Please Sign In!":
                    this.state.loginMsg}</span>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input onChange={this.handleEmailChange} value={this.state.email}
                      type="text" Name="form-control" id="email"
                      placeholder="email address" size="lg"/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input onChange={this.handlePasswordChange} value={this.state.password}
                      type="password" Name="form-control" id="password"
                      placeholder="password" size="lg"/>
                    </FormGroup>
                    <Flex nowrap>
                      <Box auto col={2} p={2}>
                        <Link to="/Account"><Button onClick={this.handleLoginUser} type="submit"
                        className="btn btn-primary">Sign In</Button></Link>
                      </Box>
                      <Box auto col={2} p={2}>
                        <Link to="/CreateAccount"><Button  type="submit"
                        className="btn btn-success">New User?</Button></Link>
                      </Box>
                    </Flex>
                  </Form>
                </Flex>
                <br/>
              </Jumbotron>
            </Flex>
          </Grid>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  LoginUser: React.PropTypes.func,
  userStore:  React.PropTypes.object
};
export default inject("userStore")(observer(Login));
