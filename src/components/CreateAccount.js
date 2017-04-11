import React from 'react';
import { inject, observer } from 'mobx-react';
import { Jumbotron, Grid, Form, FormGroup, Button } from 'react-bootstrap';
import Navigation from './Navigation';
import { Flex } from 'reflexbox';
import { Input, Label } from 'reactstrap';

class CreateAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      admin: false,
      email: "",
      loginMsg: "",
      neighborhood: "",
      name: "",
      owner: "",
      profile: "",
      bio: ""

    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNeighborhoodChange = this.handleNeighborhoodChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleProfileChange(e) {
    this.setState({profile: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleNeighborhoodChange(e) {
    this.setState({neighborhood: e.target.value});
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }


  handleBioChange(e) {
    this.setState({bio: e.target.value});

  }

  handleNewUser(event) {
    event.preventDefault();

    this.props.userStore.NewUser(this.state.name, this.state.email, this.state.password,
      this.state.neighborhood, this.state.bio, this.state.profile);
    this.setState({ password: "", email: "", name: "", neighborhood: "", profile: "", bio: ""});

  }

  render() {
    return (
      <div>
        <Navigation/>
        <div id="createAccountLoginDiv'">
          <Grid>
            <Flex align="center" justify="center">
              <Jumbotron id="signUpJumbo">
                <Flex align="center" justify="center">
                  <Form id="signUpForm">
                    <span id="spanSignUp">Sign Up Here!</span>

                    <FormGroup>
                      <Label>Name</Label>
                      <Input onChange={this.handleNameChange}  value={this.state.name} type="text"
                      Name="form-control" id="name" placeholder="name" size="lg"/>
                    </FormGroup>

                    <FormGroup>
                      <Label>Neighborhood</Label>
                      <Input onChange={this.handleNeighborhoodChange}
                      type="text" Name="form-control" id="neighborhood" placeholder="neighborhood"/>
                    </FormGroup>

                    <FormGroup controlId="formInlineEmail">
                      <Label>Email</Label>
                      <Input onChange={this.handleEmailChange}
                      type="text" placeholder="email" />
                    </FormGroup>

                    <FormGroup controlId="formInlinePassword">
                     <Label>Bio</Label>
                      <Input rows="2" onChange={this.handleBioChange}
                     type="text" placeholder="biography" />
                    </FormGroup>

                    <FormGroup controlId="formInlinePassword">
                     <Label>Password</Label>
                      <Input onChange={this.handlePasswordChange}
                      type="password" placeholder="password" />
                    </FormGroup>

                    <FormGroup controlId="formInlinePassword">
                     <Label>Profile Picture</Label>
                      <Input onChange={this.handleProfileChange}
                       type="text" placeholder="profile picture" />
                    </FormGroup>

                    <div>
                      <Button
                      onClick={this.handleNewUser} onTouchTap={this.handleNewUser}
                      type="submit" className="btn btn-success">Enter</Button>
                    </div>
                  </Form>
                </Flex>
              </Jumbotron>
            </Flex>
          </Grid>
          <div id="createAccountMainImage">
            <img id="createAccountImgPlease" src="../images/blackcollage.jpg"/>
          </div>
        </div>
      </div>

    );
  }
}

CreateAccount.propTypes = {
  userStore:  React.PropTypes.object,
};

export default inject("userStore")(observer(CreateAccount));
