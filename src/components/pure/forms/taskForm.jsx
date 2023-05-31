import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';

const TaskForm = ({ add, length }) => {

    const nameRef = useRef('');
    const descriptionRef = useRef('');
    const levelRef = useRef(LEVELS.NORMAL);

    function addTask(e) {
        e.preventDefault();
        const newTask = new Task(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        );
        add(newTask);
    }



    return (
        <form onSubmit={addTask} className='d-flex w-100 mx-5 justify-content-center align-items-center'>
            <div className='form-row'>
                <div className='col'>
                    <input
                        ref={nameRef}
                        id='inputName'
                        type='text'
                        className='form-control form-control-lg my-3'
                        required
                        autoFocus
                        placeholder='Task Name'
                    />
                </div>
                <div className='col'>
                    <input
                        ref={descriptionRef}
                        id='inputDescription'
                        type='text'
                        className='form-control form-control-lg my-3'
                        required
                        placeholder='Description'
                    />
                </div>
                <div className='col'>
                    <select
                        className='form-control form-control-lg'
                        ref={levelRef}
                        defaultValue={LEVELS.NORMAL}
                        id='selectLevel'
                    >
                        <option value={LEVELS.NORMAL}>Normal</option>
                        <option value={LEVELS.URGENT}>Urgent</option>
                        <option value={LEVELS.BLOCKING}>Blocking</option>
                    </select>
                </div>
                <div className='col'>
                    <button type='submit' className='btn btn-primary btn-lg my-3'>
                        {length > 0 ? 'Add New Task' : 'Create Your First Task'}
                    </button>
                </div>
            </div>
        </form>

    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default TaskForm; 
