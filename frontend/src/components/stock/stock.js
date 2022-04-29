import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import AddStock from "./AddStock";
import ViewStock from "./ViewStock";
import UpdateStock from "./UpdateStock";
import SearchStock from "./SearchStock";

export default class Profile extends Component {
  state = { activeItem: 'add' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSwitch(activeItem) {
    switch(activeItem) {
      case 'add':
        return <AddStock/>;
      case 'view':
        return <ViewStock/>;
      case 'update':
        return <UpdateStock/>;
    case 'search':
        return <SearchStock/>;
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { activeItem } = this.state;

    return (
      <div className="container">
      <Menu pointing secondary>
          <Menu.Item
            name='add'
            active={activeItem === 'add'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='view'
            active={activeItem === 'view'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='update'
            active={activeItem === 'update'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='search'
            active={activeItem === 'search'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
