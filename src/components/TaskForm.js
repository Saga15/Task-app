import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const initialTaskState = { title: '', description: '', status: 'added', date: '' };
  const [task, setTask] = useState(initialTaskState);
  const [errors, setErrors] = useState({ title: false, description: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setTask({ ...task, date: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {
      title: task.title.trim() === '',
      description: task.description.trim() === '',
    };

    setErrors(newError);
    
    if (!newError.title && !newError.description) {
      // Call the addTask function to add the new task
      addTask({ ...task, id: Date.now() });
      setTask(initialTaskState);
    }
  };

  return (
    <div className='flex'>
      <form className="was-validated" noValidate onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="font-weight-bold">
            Add Task
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="exampleFormControlInput1"
            placeholder="Add task here..."
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="invalid-feedback">Please add Task here</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="validationTextarea" className="form-label">
            Task Description
          </label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="validationTextarea"
            placeholder="Add Description Here"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">Please add description about the task.</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="taskDate" className="form-label">Task Date</label>
          <input
            type="date"
            id="taskDate"
            className="form-control"
            value={task.date}
            onChange={handleDateChange}
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-primary" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
