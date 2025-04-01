import React, {Component} from "react";
import "./Task.css";
import { formatDistanceToNow} from "date-fns";
import PropTypes from "prop-types";



export default class Task extends Component{

  state = {
    isEditing:false,
    newDescription: this.props.description,
    timeAgo: this.getFormattedTime(),
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({timeAgo: this.getFormattedTime()});
    }, 10000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getFormattedTime() {
    const createdDate = new Date(this.props.created); 
    if (isNaN(createdDate.getTime())) {
      console.error("Invalid date:", this.props.created);
      return "Invalid Date";
  }
  console.log(this.props.description + createdDate);
  return `Created ${formatDistanceToNow(createdDate, { addSuffix: true })}`;
}

  handleEditClick = () => {
    this.setState({isEditing: true});
  };

  handleChange = (event) => {
    this.setState({ newDescription: event.target.value});
  };

  handleKeyDown = (event) => {
    if(event.key === "Enter") {
      this.handleSaveClick();
    }
  };

  handleSaveClick = () => {
    const {id} = this.props;
    const {newDescription} = this.state;
    this.props.onEdit(id, newDescription);
    this.setState({isEditing:false});
  }

  render() {
    const { id, description, completed, onDeleted, onToggleCompleted } = this.props;
    const {isEditing,newDescription, timeAgo} = this.state;
    return (
      <li className={completed ? "completed" : ""}>
        <div className="view">
          <input 
          className="toggle" 
          type="checkbox" 
          checked={completed}
          onChange={() => onToggleCompleted(id)} />
          {isEditing ? (
            <input
            type="text"
            value={newDescription}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            />
          ):(
            <>
          <label>
            <span className="description">{description}</span>
            <span className="created">{timeAgo}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEditClick}></button>
          </>
          )}
          {!isEditing && (
            <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
          )}
        </div>
      </li>
    );
  };
  static defaultProps = {
    description: "new Task",
    created: new Date(),
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    created: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  };
}