import React, {Component} from "react";
import PropTypes from "prop-types";
import "./TasksFilter.css"


export default class TasksFilter extends Component {
    render () {
        const {filter, setFilter} = this.props;
        return (
            <ul className="filters">
                <li>
                    <button
                        className={filter === "all" ? "selected" :""}
                        onClick={() => setFilter("all")}
                >
                    All
                </button>
                </li>
                <li>
                    <button 
                        className= {filter === "active" ? "selected" : ""}
                        onClick={() => setFilter("active")}
                >
                    Active
                    </button>
                </li>
                <li>
                    <button
                        className={filter === "completed" ? "selected" : ""}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                    </li>
              </ul>
        );
    };
}

TasksFilter.defaultProps = {
    filter: "all",
};

TasksFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};

    

