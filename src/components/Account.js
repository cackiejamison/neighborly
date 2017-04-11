import React from 'react';
import { Jumbotron, Grid,  } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { Card, CardImg, Form, FormGroup } from "reactstrap";
import { Flex } from 'reflexbox';
import Navigation from './Navigation';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "",
      description: "",
      condition: "",
      url: "",
      owner: "",
      bio: "",
      profile: ""
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
  }

  handleCategoryChange(e) {
    this.setState({category: e.target.value});
  }

  handleNewProfileChange(e) {
    this.setState({profile: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleConditionChange(e) {
    this.setState({condition: e.target.value});
  }
  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }

  handleNewItem(event) {
    event.preventDefault();
    let item = this.state;
    item.owner = this.props.userStore.id;
    this.props.itemStore.newItem(item);
  }

  render() {
    return(
        <div>
          <Navigation/>
          <div id="loginDiv">
            <Grid>
              <Flex align="center" justify="left">
                <Card block id="accountCard">
                  <CardImg top width="100%" src={this.props.userStore.profile} id="cardImg" />
                  <Card id="innerCard" >
                    <h1 id="cardTitle" >{this.props.userStore.name}</h1>
                    <h3 id="cardSubtitle">{this.props.userStore.neighborhood}</h3>
                    <p>{this.props.userStore.bio}</p>
                  </Card>
                </Card>
              </Flex>
              <Flex align="center" justify="center">
                <Jumbotron id="loginJumbo">
                  <Flex align="center" justify="center">
                    <Form id="loginForm">
                      <span id="spanLogin">{this.state.loginMsg == "" ?
                       "Please Sign In!":
                      this.state.loginMsg}</span>
                    <legend>Add Your Items to Lend</legend>

                    <FormGroup>
                      <input onChange={this.handleCategoryChange} value={this.state.category}
                      className="form-control" id="category" placeholder="category"/>
                      <medium>Power Tools, Gardening, Kitchen, Recreation, Hobby</medium>
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="description"/>
                      <textarea onChange={this.handleDescriptionChange}
                      value={this.state.description}
                      placeholder="description" className="form-control"
                      id="description" rows="5"/>
                    </FormGroup>

                    <FormGroup>
                      <input onChange={this.handleConditionChange} value={this.state.condition}
                      className="form-control" id="condition" placeholder="condition"/>
                    </FormGroup>

                    <FormGroup>
                      <input onChange={this.handleUrlChange} value={this.state.url}
                        className="form-control"
                      id="url" placeholder="url"/>
                    </FormGroup>

                    <button onClick={this.handleNewItem} type="submit"
                      className="btn btn-primary">Add Your Item!
                    </button>

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

Account.propTypes = {
  children: React.PropTypes.object,
  newItem: React.PropTypes.func,
  itemStore: React.PropTypes.object,
  userStore: React.PropTypes.object,
  user: React.PropTypes.object
};

export default inject ('itemStore', 'userStore')(observer(Account));
