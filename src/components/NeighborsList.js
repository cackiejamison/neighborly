import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card,  CardTitle, CardText, CardImg } from "reactstrap";



NeighborsList.propTypes = {
  account: React.PropTypes.object,
  userStore: React.PropTypes.object,
  newUser: React.PropTypes.func,
  users: React.PropTypes.array.isRequired
};

function NeighborsList(props) {
  let addedUsers = props.users.map(function(user) {
    return (
      <Card block key={user._id}>
        <CardImg top width="100%" src={"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQvYsLi4rTkCeFnOwk70fQfecW6g1mBRKgE4hNPsc3QdFCQmaJoH-8xVuQ"} rounded alt="Card image cap"/>
        <Card block inverse
          style={{ backgroundColor: '#333', borderColor: '#333', width: '100%'}}>
          <CardTitle>{user.name}</CardTitle>
          <CardText>{user.neighborhood}</CardText>


        </Card>
      </Card>
    );
  });

  return (
    <div>
      {addedUsers}
    </div>
  );
}

export default inject('userStore')(observer(NeighborsList));
