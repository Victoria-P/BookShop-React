import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import AdminBookCard from "./adminBookCard";

export default class FormModal extends Component {
  state = { modalOpen: this.props.modalOpen };

  componentWillReceiveProps(newProps) {
    this.setState({ modalOpen: newProps.modalOpen });
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} color="green">
            {this.props.buttonText}
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="browser" content={this.props.title} />
        <Modal.Content>{this.props.content}</Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
