import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../Style/TaskList.css";

function TaskList({ tasks, setTasks }) {
  const [taskColumns, setTaskColumns] = useState({
    added: [],
    started: [],
    completed: [],
  });

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const added = tasks.filter((task) => task.status === "added");
      const started = tasks.filter((task) => task.status === "started");
      const completed = tasks.filter((task) => task.status === "completed");

      setTaskColumns({
        added: added || [],
        started: started || [],
        completed: completed || [],
      });
    }
  }, [tasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const { source, destination } = result;

    setTaskColumns((prevColumns) => {
      if (source.droppableId === destination.droppableId) {
        // Reordering within the same list
        const updatedTasks = [...tasks];
        const tasksToUpdate = [...prevColumns[source.droppableId]];
        const [reorderedTask] = tasksToUpdate.splice(source.index, 1);
        tasksToUpdate.splice(destination.index, 0, reorderedTask);

        updatedTasks.forEach((task) => {
          if (task.id === reorderedTask.id) {
            task.status = source.droppableId;
          }
        });

        setTasks(updatedTasks);
        return {
          ...prevColumns,
          [source.droppableId]: tasksToUpdate,
        };
      } else {
        // Moving from one list to another
        const movedTask = tasks.find(
          (task) => task.id.toString() === result.draggableId
        );
        movedTask.status = destination.droppableId;

        const updatedTasks = tasks.map((task) => {
          if (task.id === movedTask.id) {
            return { ...task, status: destination.droppableId };
          }
          return task;
        });

        setTasks(updatedTasks);
        return {
          ...prevColumns,
          [source.droppableId]: prevColumns[source.droppableId].filter(
            (task) => task.id !== movedTask.id
          ),
          [destination.droppableId]: [
            ...prevColumns[destination.droppableId],
            movedTask,
          ],
        };
      }
    });
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          <div className="col">
            <Droppable droppableId="added" key="added">
              {(provided) => (
                <div
                  className="droppable-col"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4 className="text-dark  text-center">Added</h4>

                  <TransitionGroup>
                    {taskColumns.added.map((task, index) => (
                      <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="task"
                      >
                        <TaskItem task={task} index={index} />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="col">
            <Droppable droppableId="started" key="started">
              {(provided) => (
                <div
                  className="droppable-col"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4 className="text-dark text-center">Started</h4>
                  <TransitionGroup>
                    {taskColumns.started.map((task, index) => (
                      <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="task"
                      >
                        <TaskItem task={task} index={index} />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="col">
            <Droppable droppableId="completed" key="completed">
              {(provided) => (
                <div
                  className="droppable-col"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h4 className="text-dark text-center " text-center>
                    Completed
                  </h4>
                  <TransitionGroup>
                    {taskColumns.completed.map((task, index) => (
                      <CSSTransition
                        key={task.id}
                        timeout={500}
                        classNames="task"
                      >
                        <TaskItem task={task} index={index} />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskList;
