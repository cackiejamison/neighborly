import React from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import ItemList from './ItemList';
import Navigation from './Navigation';
import { CardColumns, Form, FormGroup, Input, Label } from "reactstrap";
import { Flex } from 'reflexbox';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      modal: false,
      cSelected: [],
      filterText: '',
      filtered: this.props.itemStore
    };
    this.toggle = this.toggle.bind(this);
    this.loadItemsFromServer = this.loadItemsFromServer.bind(this);
    this.searchItems = this.searchItems.bind(this);
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  componentDidMount() {
    this.loadItemsFromServer();
  }

  loadItemsFromServer() {
    fetch('/item')
      .then(function(result) {return result.json();})
      .then(items => this.props.itemStore.setItems(items));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }


  searchItems(event) {
    event.preventDefault();
    this.props.itemStore.filteredItems=[];
    this.props.itemStore.items.forEach((item) => {
      if (item.category.indexOf(this.state.filterText) !== -1 ||
        item.description.indexOf(this.state.filterText) !== -1  ) {
        this.props.itemStore.filteredItems.push(item);
      } else {
        return;
      }
    });
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleFilterTextInputChange(e) {
    this.setState({filterText: e.target.value});
  }


  render() {
    return(
      <div>
        <div>
          <Navigation/>
        </div>

        <div id="browseJumboDiv">
          <Grid>
            <Flex align="center" justify="center">
              <Jumbotron id="jumbotronSearch">
                <div>
                  <Flex align="center" justify="center">
                    <span id="browseSpan">Browse Available Items</span>
                  </Flex>
                </div>

                  <Form onSubmit={this.searchItems}>
                    <Flex align="center" justify="center">
                      <FormGroup  style={{width: "65%"}}>
                        <Label id="Search">SEARCH</Label>
                        <Input onChange={this.handleFilterTextInputChange}
                        type="text" state="success"
                        placeholder="Power Tools, Gardening, Hobby, Recreation, Kitchen"
                        value={this.state.filterText} />
                      </FormGroup>
                    </Flex>

                  <div>
                    <Flex align="start" justify="center">
                      <Button onSubmit={this.searchItems}
                        type="submit" className="btn btn-primary btn-lg" id="searchBtn">Search
                      </Button>
                    </Flex>
                  </div>
                </Form>
              </Jumbotron>
            </Flex>
          </Grid>
        </div>

        <div>
          <Grid>
            <Jumbotron style={{ backgroundColor: 'transparent' }}>
              <CardColumns>
                <ItemList items={this.state.filtered.filteredItems}/>
              </CardColumns>
            </Jumbotron>
          </Grid>
        </div>
      </div>
    );
  }
}

Browse.propTypes = {
  userStore: React.PropTypes.object,
  itemStore: React.PropTypes.object,
  items: React.PropTypes.object,
  filteredItems: React.PropTypes.object,
  user: React.PropTypes.object,
  filtered: React.PropTypes.array
};

export default inject('itemStore', 'userStore')(observer(Browse));
