import React, { useState, useEffect } from 'react';
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';
import TaskForm from '../pure/forms/taskForm';
import './task_list.css'



const TaskListComponent = () => {

    const defaultTask1 = new Task('Example1', 'Description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example2', 'Description2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example3', 'Description3', false, LEVELS.BLOCKING);

    //Estado del componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);


    //Control del ciclo de vida 
    useEffect(() => {

        console.log('Task state has been Modified');

        setTimeout(() => {
            setLoading(false);
        },2000);
        return () => {
            console.log('TaskList Component is going to unmount....');
        };
    }, [tasks]);


    function completeTask(task) {
        console.log('complete this task: ', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;

        //we update the state of the component with the new list of tasks and it will update the
        // Iteration of the tasks in order to show the task updated

        setTasks(tempTasks);
    };

    function deleteTask(task) {
        console.log('Delete this task: ', task);
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index, 1);
        setTasks(tempTasks);
    }

    function addTask(task) {
        console.log('Add this task: ', task);
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);


    }

    const Table = () => {
        return (
            <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => {
                    return (
                        <TaskComponent
                            key={index}
                            task={task}
                            complete={completeTask}
                            remove={deleteTask}
                        >
                        </TaskComponent>
                    )
                })}
            </tbody>
        </table>
        
        )
    }

    let tasksTable;

    if (tasks.length > 0 ) {
        tasksTable = <Table></Table>
    } else {
        tasksTable = (
            <div style={{ width: '23rem', height: '25rem' }}>
                <h3>There are no tasks to show</h3>
                <h4>Please, create one</h4>
            </div>
        )
            
    }

    return (
        <div className='task-container'>
            <div className='col'>
                <div className='card'>
                    <div className='card-header p-3'>
                        <h5>Your Tasks:</h5>

                    </div>

                    <div className='card-body' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '25rem' }}>
                        { loading ? (<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>) 
                        :  tasksTable}
                    </div>
                </div>
            </div>
            <TaskForm add={addTask} length={tasks.length}></TaskForm>
        </div>
    );
}; 





export default TaskListComponent;
