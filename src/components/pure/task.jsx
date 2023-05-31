import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Models
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';

//Importamos los styles
import '../../styles/task.scss'


const TaskComponent = ({ task, complete, remove }) => {


    useEffect(() => {
        console.log('Tarea Creada');
        return () => {
            console.log(`Task: ${task.name} is going to unmount`);
        };
    }, [task]);

    /**
     * function that returns a badge
     * depending on the level of the task
     */
    function taskLevelBadge() {
        switch (task.level) {
            case LEVELS.NORMAL:
                
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            {task.level}
                        </span>
                    </h6>
                )
            case LEVELS.URGENT:
                
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-warning'>
                            {task.level}
                        </span>
                    </h6>
                )
            case LEVELS.BLOCKING:
                
                return(
                    <h6 className='mb-0'>
                        <span className='badge bg-danger'>
                            {task.level}
                        </span>
                    </h6>
                )    
        
            default:
                break;
        }
        
    }

    /**
     * Funcition that returns icon depending on completion of the task
     */
    function taskCompletedIcon() {
        if (task.completed) {
            return (<i onClick={() => complete(task)} className='bi-toggle-on task-action' style={{color: 'green'}}></i>) 
        } else {
            return (<i onClick={() => complete(task)} className='bi-toggle-off task-action' style={{color: 'grey'}}></i>) 
        }
    }

    const taskCompleted ={
        color: 'gray',
        fontWeight: 'bold',
        textDecoration: 'line-through'
    }

    const taskPending ={
        color: 'Black',
        fontWeight: 'bold'
    }
    

    return (
        <tr className='fw-normal' style={task.completed ? taskCompleted : taskPending }>
            <th>
                <span className='ms-2'> {task.name} </span>
            </th>
            <td>
                <span className='align-middle'> {task.description} </span>
            </td>
            <td>
                {taskLevelBadge()}
            </td>
            <td className='align-middle'>
                {taskCompletedIcon()}
                <i className='bi-trash task-action'onClick={() => remove(task)} style={{color: 'tomato'}}></i>
            </td>
        </tr>

    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete:  PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};


export default TaskComponent;
