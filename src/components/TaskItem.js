import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "./TaskItem.css"

function TaskItem({ task, index }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-item-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-header">
            <h5 className="task-title">{task.title}</h5>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskItem;