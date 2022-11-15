import { date } from 'joi';
import React from 'react';
import { useState } from 'react';
import Modal from '../../components/modal/Modal.jsx';
import styles from './expenses.module.css';
import Loader from '../../components/loader/Loader.jsx';
import { useGetExpensesQuery, useAddExpensesMutation, useEditExpensesMutation, useDeleteExpensesMutation } from '../../redux/api/expensesApi.js';

export default function Expenses() {
  const { data, isLoading, error } = useGetExpensesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const [triggerAdd, { dataAdd, isLoadingAdd, isError, isFetching, isUninitialized }] = useAddExpensesMutation(expense);

  const [triggerEdit, { dataEdit, isLoadingEdit, isErrorEdit, isFetchingEdit, isUninitializedEdit }] = useEditExpensesMutation(expense);

  const [triggerDelete, { dataDelete, isLoadingDelete, isErrorDelete, isFetchingDelete, isUninitializedDelete }] = useDeleteExpensesMutation(expense);

  let total = 0;
  let mati = 0;
  let maga = 0;
  let numb = 0;
  let difference = 0;
  let userTop = '';
  let setCero = 0;
  let userTopId = '';

  const calulator = () => {
    // eslint-disable-next-line array-callback-return
    data?.map((item) => {
      total += item.monto;
      if (item.id_usuario === 1) {
        mati += item.monto
      }
      if (item.id_usuario === 2) {
        maga += item.monto
      }
    });
    let divide = total / 2;

    if (mati > maga) {
      numb = divide - maga;
      difference = Math.floor(numb.toFixed(2));
      userTop = 'Maga';
    } else {
      numb = divide - mati;
      difference = Math.floor(numb.toFixed(2));
      userTop = 'Mati';
    }

    setCero = difference * 2;
    return mati;
  }

  calulator();

  //console.log(Math.floor(difference))

  const balance = () => {
    let user = userTop === 'Mati' ? 1 : 2;
    setExpense({
      descripcion: "Balance a $0",
      monto: setCero,
      id_usuario: user,
      date: new Date(Date.now()).toLocaleDateString().substr(0, 10)
    })
    console.log(expense);
    triggerAdd(expense);
  }

  const [show, setShow] = useState(false);
  const [modalExpenses, setModalExpenses] = useState(false);
  //MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [expense, setExpense] = useState({
    descripcion: "",
    monto: "",
    id_usuario: "",
    idgastos: "",
    date: ""
  })

  const onChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const add = (e) => {
    e.preventDefault();

    console.log('esto se guarda', expense)


    if (!expense.descripcion || !expense.monto || !expense.id_usuario || !expense.date) {
      alert('Faltan datos. Completar');
      setIsOpen(true);
    } else {
      triggerAdd(expense);
      setExpense({
        descripcion: "",
        monto: "",
        id_usuario: "",
        idgastos: "",
        date: ""
      });
      setIsOpen(false);
      setIsAdding(false);
    }

  };

  const edit = (e) => {
    e.preventDefault();
    console.log(expense);
    triggerEdit(expense);
    setExpense({
      descripcion: "",
      monto: "",
      id_usuario: "",
      idgastos: "",
      date: ""
    });
    setIsOpen(false);
  };

  const closeModal = () => {
    setExpense({
      descripcion: "",
      monto: "",
      id_usuario: "",
      idgastos: "",
      date: ""
    });
    setIsOpen(false);
    setIsAdding(false);
  }

  if (isLoading) {
    return <Loader />
  } 


  return (
    // MODAL

    <section className={styles.expenses}>

      <div className={styles.names}>
        <button className={styles.circle} onClick={() => setModalExpenses(prevshow => !prevshow)}>
          <h2>{userTop}</h2>
          <h2>${difference}</h2>
        </button>
      </div>


      <button onClick={() => {
        setIsOpen(true);
        setIsAdding(true);
      }
      } className={styles.add}>+</button>



      {isOpen &&
        <Modal setIsOpen={setIsOpen} title={isAdding ? 'Nuevo Gasto' : 'Gasto'} className={show ? styles.index : ''} setShow={setShow}>

          <form onSubmit={isAdding ? add : edit}>
            <input
              type="text"
              name="descripcion"
              placeholder='descripción'
              value={expense.descripcion}
              onChange={onChange}
            />
            <input
              type="number"
              name="monto"
              placeholder='monto'
              value={expense.monto}
              onChange={onChange}
            />
            <select name="id_usuario" id=""
              value={expense.id_usuario}
              placeholder='Usuario'
              onChange={onChange}
              className={styles.select}
            >
              <option value="">Usuario</option>
              <option value="1">Mati</option>
              <option value="2">Maga</option>
            </select>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={onChange}
              className={styles.centerText}
            />
            <input
              type="hidden"
              name="id"
              value={expense.idgastos}
              onChange={onChange}
            />
            <div className={styles.buttonModal}>
              <input type="submit" value={'Compensar'} onClick={() => balance()} className={styles.buttonCompensar} />
              <input type="submit" value={'Eliminar'} onClick={() => triggerDelete(expense.idgastos)} className={styles.buttonDelete} />
              <input type="submit" value={'Guardar'} className={styles.buttonConfirm} />
            </div>
          </form>

        </Modal>
      }

      {modalExpenses &&

        <Modal setIsOpen={setModalExpenses} title={'Lista de gastos'} setShow={setModalExpenses}>
          <div className={styles.expensesList}>
            <ul >
              {data?.map((expense) => (
                <li key={expense.idtareas}>
                  <a href="#" onClick={() => {
                    setIsOpen(true);
                    setShow(prevshow => !prevshow);
                    console.log('el z.index', show);
                    setExpense({
                      descripcion: expense.descripcion,
                      monto: expense.monto,
                      id_usuario: expense.id_usuario,
                      idgastos: expense.idgastos,
                      date: new Date(expense.date).toISOString().substr(0, 10),
                    })
                  }} className={expense.descripcion === 'Balance a $0' ? styles.done : ''}>{new Date(expense.date).toLocaleDateString().substr(0, 10)} |
                    ${expense.descripcion === 'Balance a $0' ? expense.monto / 2 : expense.monto} | {expense.id_usuario === 1 ? 'Mati' : 'Maga'} |</a>
                </li>
              ))}
            </ul>
          </div>
        </Modal>

      }
    </section>
  )
}