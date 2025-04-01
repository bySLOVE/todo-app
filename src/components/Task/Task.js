import React, {Component} from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";



export default class Task extends Component{

  render() {
    const { id, description, created, completed, onDeleted, onToggleCompleted } = this.props;
    return (
      <li className={completed ? "completed" : ""}>
        <div className="view">
          <input 
          className="toggle" 
          type="checkbox" 
          defaultChecked={completed}
          onChange={() => onToggleCompleted(id)} />
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={() => onDeleted(id)}></button>
        </div>
      </li>
    );
  };
  static defaultProps = {
    description: "new Task",
    created: formatDistanceToNow(new Date(), {addSuffix:true}),
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    created: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
  };
}