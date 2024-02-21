// TaskList.js
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks }) {
  const [taskColumns, setTaskColumns] = useState({
    added: [],
    started: [],
    completed: []
  });

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const added = tasks.filter(task => task.status === 'added');
      const started = tasks.filter(task => task.status === 'started');
      const completed = tasks.filter(task => task.status === 'completed');

      setTaskColumns({
        added: added || [],
        started: started || [],
        completed: completed || []
      });
    }
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
  
    const { source, destination } = result;
  
    setTaskColumns(prevColumns => {
      if (source.droppableId === destination.droppableId) {
        // Reordering within the same list
        const updatedTasks = [...tasks];
        const tasksToUpdate = [...prevColumns[source.droppableId]];
        const [reorderedTask] = tasksToUpdate.splice(source.index, 1);
        tasksToUpdate.splice(destination.index, 0, reorderedTask);
  
        updatedTasks.forEach(task => {
          if (task.id === reorderedTask.id) {
            task.status = source.droppableId;
          }
        });
  
        setTasks(updatedTasks);
        return {
          ...prevColumns,
          [source.droppableId]: tasksToUpdate
        };
      } else {
        // Moving from one list to another
        const movedTask = tasks.find(task => task.id.toString() === result.draggableId);
        movedTask.status = destination.droppableId;
  
        const updatedTasks = tasks.map(task => {
          if (task.id === movedTask.id) {
            return { ...task, status: destination.droppableId };
          }
          return task;
        });
  
        setTasks(updatedTasks);
        return {
          ...prevColumns,
          [source.droppableId]: prevColumns[source.droppableId].filter(task => task.id !== movedTask.id),
          [destination.droppableId]: [...prevColumns[destination.droppableId], movedTask]
        };
      }
    });
   console.log(taskColumns,"drag")
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="d-flex justify-content-between">
        <Droppable droppableId="added" key="added">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
             <h4 style={{ color: '#3498db' }}>Added</h4>
              {taskColumns.added.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="started" key="started">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
               <h4 style={{ color: '#27ae60' }}>Started</h4>
              {taskColumns.started.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed" key="completed">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
             <h4 style={{ color: '#e74c3c' }}>Completed</h4>
              {taskColumns.completed.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default TaskList;
