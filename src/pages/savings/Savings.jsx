import React from 'react';
import { useState } from 'react';
import Modal from '../../components/modal/Modal.jsx';
import styles from './savings.module.css';
import Loader from '../../components/loader/Loader.jsx';
import { useGetSavingsQuery, useAddSavingsMutation, useEditSavingMutation, useDeleteSavingMutation } from '../../redux/api/savingsApi';

export default function Savings() {

  // RTK
  const { data: savings, isLoading, error } = useGetSavingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const [triggerAdd, { dataAdd, isLoadingAdd, isError, isFetching, isUninitialized }] = useAddSavingsMutation(saving);

  const [triggerEdit, { dataEdit, isLoadingEdit, isErrorEdit, isFetchingEdit, isUninitializedEdit }] = useEditSavingMutation(saving);

  const [triggerDelete, { dataDelete, isLoadingDelete, isErrorDelete, isFetchingDelete, isUninitializedDelete }] = useDeleteSavingMutation(saving);

  // useState
  const [show, setShow] = useState(false);
  const [modalSaving, setModalsaving] = useState(false);
  const [dolarSaving, setDolarSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState({
    id_usuario: "",
    monto: "",
    moneda: "",
    idAhorro: "",
    date: ""
  })

  let ars = 0;
  let usd = 0;

  const calculator = () => {

    savings?.filter((item) => {
      if (item.moneda === 'ARS') {
        ars += item.monto;
      }
      if (item.moneda === 'USD') {
        usd += item.monto;
      }
    })
    return ars;
  }

  calculator();

  const onChange = (e) => {
    setSaving({ ...saving, [e.target.name]: e.target.value });
    console.log(saving);
  };


  const add = (e) => {
    e.preventDefault();

    console.log('esto se guarda', saving)

    if (!saving.monto || !saving.id_usuario || !saving.date) {
      alert('Faltan datos. Completar');
      setIsOpen(true);
    } else {
      triggerAdd(saving);
      setSaving({
        id_usuario: "",
        monto: "",
        moneda: "",
        date: "",
        idAhorro: ""
      });
      setIsOpen(false);
      setIsAdding(false);
    }

  };

  const edit = (e) => {
    console.log(saving)
    e.preventDefault();
    triggerEdit(saving);
    setSaving({
      id_usuario: "",
      monto: "",
      moneda: "",
      date: "",
      idAhorro: ""
    });
    setIsOpen(false);
  };

  console.log(savings)

  if (isLoadingAdd) {
    return <Loader />
  } 

  return (
    // MODAL

    <section className={styles.savings}>
      {/* CIRCLES */}
      <div className={styles.names}>
        <button className={styles.circleARS} onClick={() => setModalsaving(prevshow => !prevshow)}>
          <h2>ARS</h2>
          <h2>${ars}</h2>
        </button>
      </div>

      <div className={styles.names}>
        <button className={styles.circleUSD} onClick={() => setDolarSaving(prevshow => !prevshow)}>
          <h2>USD</h2>
          <h2>${usd}</h2>
        </button>
      </div>


      <button onClick={() => {
        setIsOpen(true);
        setIsAdding(true);
      }
      } className={styles.add}>+</button>

      {isOpen &&
        <Modal setIsOpen={setIsOpen} title={isAdding ? 'Nuevo Ingreso' : 'Ahorro'} className={show ? styles.index : ''} setShow={setShow}>

          <form onSubmit={isAdding ? add : edit}>

            <input
              type="number"
              name="monto"
              placeholder='monto'
              value={saving.monto}
              onChange={onChange}
            />

            <select name="moneda" id=""
              value={saving.moneda}
              placeholder='Usuario'
              onChange={onChange}
              className={styles.select}
            >
              <option value="">Moneda</option>
              <option value="ARS">Pesos</option>
              <option value="USD">Dólares</option>
            </select>

            <select name="id_usuario" id=""
              value={saving.id_usuario}
              placeholder='Usuario'
              onChange={onChange}
              className={styles.select}
            >
              <option value="">Ususario</option>
              <option value="1">Mati</option>
              <option value="2">Maga</option>
            </select>

            <input
              type="date"
              name="date"
              value={saving.date}
              onChange={onChange}
              className={styles.centerText}
            />

            <input
              type="hidden"
              name="id"
              value={saving.idAhorro}
              onChange={onChange}
            />

            <div className={styles.buttonModal}>
              <input type="submit" value={'Eliminar'} onClick={() => {
                setShow(prevshow => !prevshow);
                triggerDelete(saving.idAhorro)
              }
              } className={styles.buttonDelete} />
              <input type="submit" value={'Guardar'} className={styles.buttonConfirm}  onClick={() => {
                setShow(prevshow => !prevshow);
              }
             } />
            </div>
          </form>

        </Modal>
      }

      {modalSaving &&
        <Modal setIsOpen={setModalsaving} title={'Lista de gastos'} setShow={setModalsaving}>
          <div className={styles.savingsList}>
            <ul>
              {savings?.map((saving) => {
                if (saving.moneda == 'ARS') {
                  return (
                    <a href="#" onClick={() => {
                      setIsOpen(true);
                      setShow(prevshow => !prevshow);
                      setSaving({
                        id_usuario: saving.id_usuario,
                        monto: saving.monto,
                        date: new Date(saving.date).toISOString().substr(0, 10),
                        moneda: saving.moneda,
                        idAhorro: saving.idahorros
                      })
                    }} >
                      <li key={saving.idAhorro} > {new Date(saving.date).toLocaleDateString().substr(0, 10)} |
                        ${saving.descripcion === 'Balance a $0' ? saving.monto / 2 : saving.monto} | {saving.id_usuario === 1 ? 'Mati' : 'Maga'} | {saving.moneda} </li>
                    </a>
                  )
                }
              })}
            </ul>
          </div>
        </Modal>
      }

      {dolarSaving &&
        <Modal setIsOpen={setDolarSaving} title={'Lista de gastos'} setShow={setDolarSaving}>
          <div className={styles.savingsList}>
            <ul>
              {savings?.map((saving) => {
                if (saving.moneda == 'USD') {
                  return (
                    <a href="#" onClick={() => {
                      setIsOpen(true);
                      setShow(prevshow => !prevshow);
                      setSaving({
                        id_usuario: saving.id_usuario,
                        monto: saving.monto,
                        date: new Date(saving.date).toISOString().substr(0, 10),
                        moneda: saving.moneda,
                        idAhorro: saving.idahorros
                      })
                    }} >
                      <li key={saving.idAhorro} > {new Date(saving.date).toLocaleDateString().substr(0, 10)} |
                        ${saving.descripcion === 'Balance a $0' ? saving.monto / 2 : saving.monto} | {saving.id_usuario === 1 ? 'Mati' : 'Maga'} | {saving.moneda} </li>
                    </a>
                  )
                }
              })}
            </ul>
          </div>
        </Modal>
      }

    </section>
  )
}


