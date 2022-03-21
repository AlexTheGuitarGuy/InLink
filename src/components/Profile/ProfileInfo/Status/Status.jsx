import s from './Status.module.css';
import { Component } from 'react';

class Status extends Component {
  state = {
    isEditing: false,
    status: this.props.status,
  };

  editMode = (payload) => {
    this.setState({ isEditing: payload });
    if (payload === false && payload !== '')
      this.props.updateStatus(this.state.status);
  };

  editLocalStatus = (e) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className={s.all}>
        {(!this.state.isEditing && (
          <div
            className={s.descriptionText}
            onClick={() => {
              if (this.props.canEdit) return this.editMode(true);
            }}
          >
            {this.props.status || 'No status'}
          </div>
        )) ||
          (this.state.isEditing && (
            <input
              onChange={this.editLocalStatus}
              className={s.descriptionEdit}
              autoFocus={true}
              onBlur={() => this.editMode(false)}
              defaultValue={this.state.status}
            />
          ))}
      </div>
    );
  }
}

export default Status;
