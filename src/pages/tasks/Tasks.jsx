import React from 'react';
import { useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } from '../../redux/api/tasksApi';
import { useState } from 'react';
import Modal from '../../components/modal/Modal.jsx';
import styles from './tasks.module.css';

export default function Tasks() {
  const { data, isLoagin, error } = useGetTaskQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const [triggerAdd, {dataAdd, isLoading, isError, isFetching, isUninitialized}] = useAddTaskMutation(task);

  const [triggerEdit, {dataEdit, isLoadingEdit, isErrorEdit, isFetchingEdit, isUninitializedEdit}] = useEditTaskMutation(task);

  const [triggerDelete, {dataDelete, isLoadingDelete, isErrorDelete, isFetchingDelete, isUninitializedDelete}] = useDeleteTaskMutation(task);


  //MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    date: "",
    done: "",
    id: ""
  })

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const add = (e) => {
    e.preventDefault();
    triggerAdd(task);
    setTask({
      titulo: "",
      description: '',
      workedHours: '',
      date: '',
      id: ""
    });
    setIsOpen(false);
    setIsAdding(false);
  };

  const edit = (e) => {
    e.preventDefault();
    console.log(task);
    triggerEdit(task);
    setTask({
      titulo: "",
      description: '',
      workedHours: '',
      date: '',
      id: ""
    });
    setIsOpen(false);
  };

  const closeModal = () => {
    setTask({
      titulo: "",
      description: '',
      workedHours: '',
      date: '',
      id: ""
    });
    setIsOpen(false);
    setIsAdding(false);
  }

  return (
    // MODAL

    <section className={styles.tasks}>
      <button onClick={() => {
        setIsOpen(true);
        setIsAdding(true);
        }
      } className={styles.add}>Nueva</button>

      <ul>
        {data?.map((task) => (
          <li key={task.idtareas}>
            <a href="#" onClick={() => {
              setIsOpen(true)
              setTask({
                titulo: task.titulo,
                descripcion: task.descripcion,
                date: new Date(task.date).toISOString().substr(0, 10),
                done: task.done,
                id: task.idtareas
              })
            }} className={task.done ? styles.done : ''}>{task.titulo}</a>
          </li>
        ))}
      </ul>

      {isOpen &&
        <Modal setIsOpen={setIsOpen} title={isAdding ? 'Nueva Tarea' : 'Tarea'} >
          <form onSubmit={isAdding ? add : edit}>
            <input
              type="text"
              name="titulo"
              value={task.titulo}
              onChange={onChange}
              className={styles.centerText}
            />
            <textarea
              rows={20}
              type="text"
              name="descripcion"
              value={task.descripcion}
              onChange={onChange}
              className={styles.descripcion}
            />
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={onChange}
              className={styles.centerText}
            />
            <select name="done" id=""
              value={task.done}
              placeholder='Hecho?'
              onChange={onChange}
              className={styles.select}
            >
              <option value="0">Pendiente</option>  
              <option value="1">Hecho</option>  
            </select>          
            <input
              type="hidden"
              name="id"
              value={task.id}
              onChange={onChange}
            />
            <div className={styles.buttonModal}>
              <input type="submit" value={'Eliminar'} onClick={() => triggerDelete(task)} className={styles.buttonDelete}/>
              <input type="submit" value={'Guardar'} className={styles.buttonConfirm} />
            </div>
          </form>
        </Modal>
      }
    </section>
  )
}
