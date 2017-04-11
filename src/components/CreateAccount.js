import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col } from 'react-bootstrap';

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
      url: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNeighborhoodChange = this.handleNeighborhoodChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
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

  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }

  handleNewUser(event) {
    event.preventDefault();
    this.props.userStore.NewUser(this.state.email, this.state.password, this.state.name,
      this.state.neighborhood, this.state.url, this.state.owner);
    this.setState({ password: "", email: "", name: "", neighborhood: "", owner: "", url: ""});
  }

  render() {
    return (
        <Col md={5} mdPull={5}>
          <form method="" role="form">
            <legend>{this.state.loginMsg == "" ? "New to the Neighborhood? Create an Account!":
            this.state.loginMsg}</legend>

            <div className="form-group">
              <input onChange={this.handleNameChange} value={this.state.name} type="text"
              className="form-control" id="name" placeholder="name"/>
            </div>

            <div className="form-group">
              <input onChange={this.handleNeighborhoodChange} value={this.state.neighborhood}
              type="text" className="form-control" id="neighborhood" placeholder="neighborhood"/>
            </div>

            <div className="form-group">
              <input onChange={this.handleEmailChange} value={this.state.email} type="text"
              className="form-control" id="email" placeholder="email address"/>
            </div>

            <div className="form-group">
              <input onChange={this.handlePasswordChange} value={this.state.password}
              type="password" className="form-control" id="password" placeholder="password"/>
            </div>

            <div className="form-group">
              <input onChange={this.handleUrlChange} value={this.state.url} type="text"
              className="form-control" id="url" placeholder="profile picture"/>
            </div>

            <button
              onClick={this.handleNewUser} type="submit" className="btn btn-primary">Submit
            </button><br/>

          </form><br/>



        </Col>
    );
  }
}

CreateAccount.propTypes = {
  userStore:  React.PropTypes.object,
};

export default inject("userStore")(observer(CreateAccount));
