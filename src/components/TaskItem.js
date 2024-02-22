import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import "./Style/TaskItem.css" ;
import "../Style/TaskItem.css"

function TaskItem({ task, index }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-item-container fade show"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-header">
            <h5 className="task-title"> Task-{task.title}</h5>
            <p> Des-{task.description}</p>
            <small>Date-{task.date}</small>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskItem;