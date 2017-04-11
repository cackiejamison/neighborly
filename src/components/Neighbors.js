import React from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import NeighborsList from './NeighborsList';
import Navigation from './Navigation';
import { CardColumns } from "reactstrap";

class Neighbors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users:[]};
    this.loadUsersFromServer = this.loadUsersFromServer.bind(this);
  }

  componentDidMount() {
    this.loadUsersFromServer();
  }

  loadUsersFromServer() {
    fetch('/user')
      .then(function(result) {return result.json();})
      .then(users => {
        console.log(users);
        this.setState({users:users});
      }
    );
  }


  render() {
    return (
      <div>
        <div>
          <Navigation/>
        </div>

        <div>
          <div style={{paddingTop:"200px"}}>
            <Grid>
              <Jumbotron style={{ backgroundColor: '#D1D5D8' }}>
                <CardColumns>
                  <NeighborsList users={this.state.users}/>
                </CardColumns>
              </Jumbotron>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}


Neighbors.propTypes = {
  userStore: React.PropTypes.object,
  itemStore: React.PropTypes.object,
  items: React.PropTypes.object,
  user: React.PropTypes.object,
};

export default inject ('userStore')(observer(Neighbors));
