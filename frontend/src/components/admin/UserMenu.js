import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import UserList from "./UserList"

export default class Profile extends Component {
  state = { activeItem: 'view' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSwitch(activeItem) {
    switch(activeItem) {
      case 'view':
        return <UserList/>;
      case 'history':
        return
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
            name='view'
            active={activeItem === 'view'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='history'
            active={activeItem === 'history'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
