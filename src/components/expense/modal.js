import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import addExpense from './../../services/expenseService';
import handleCookie from './../handleCookie/handleCookie';
import './modal.css';

const getId = (currentUser) => {
  return currentUser.id;
}

const validAmount = (value) => {
  if (value <= 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a valid amount
      </div>
    );
  }
};

const validDescription = (value) => {
  if (value.length === 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The description must have some content.
      </div>
    );
  }
};

const AddExpenseForm = (props) => {

  const form = useRef();
  let [description, setDescription] = useState('');
  let [amount, setAmount] = useState(0);
  let [payerId, setPayerId] = useState(null);
  let [debtors, setDebtors] = useState([]);
  let [allUsersPayers, setAllUsersPayers] = useState(null);
  let [allUsersDebtors, setAllUsersDebtors] = useState(null);
  let dummyUser = {
    id: undefined, name: undefined, phoneNumber: undefined
  }
  const [successful, setSuccessful] = useState(false);

  function clearAll() {
    setDescription('');
    setAmount(undefined);
    setAllUsersDebtors(null);
    setAllUsersPayers(null);
    setDebtors([]);
    setPayerId(null);
  }

  async function close() {
    props.onHide(false);
  }

  const onChangeDescription = (e) => {
    const desc = e.target.value;
    setDescription(desc);
  };

  const onChangeAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const onChangePayer = (e) => {
    const index = e.target.value;
    setPayerId(allUsersPayers[index].id)
  }

  const onChangeDebtors = (e) => {
    const index = e.target.value;
    let replace = false;
    debtors.forEach(item => {
      if (item.id === allUsersDebtors[index].id) replace = true;
    });
    if (!replace)
      setDebtors(debtors.concat({ id: allUsersDebtors[index].id, name: allUsersDebtors[index].name, phoneNumber: allUsersDebtors[index].phoneNumber }));
  }

  function amountClear() {
    setAmount('');
  }

  async function handleRegister(e) {
    e.preventDefault();
    setSuccessful(false);

    let token = handleCookie.getCookie('esaUserToken');
    if (amount < 1) {
      alert("Please enter valid amount for this expense");
    } else if (description.length === 0) {
      alert("Please enter a descrption for this expense");
    } else if (payerId == null) {
      alert("Please assign a payer for this expense");
    } else if (debtors.length === 0) {
      alert("Please assign debtors for this expense");
    } else {
      try {
        let debtorIds = debtors.map(getId);
        amount = parseFloat(amount);
        let response = await addExpense({ token, description, amount, payerId, debtorIds });
        if (response.status === 200) {
          let res = await response.json();
          props.setRes(res);
          props.setResState();
        } else {
          if (response.status === 401) {
            alert("The expense creation was not successful \n Please login again")
            props.history.push('/login');
          } else {
            alert("The expense creation was not successful");
          }
        }
      }
      catch (error) {
        alert("The expense creation was not successful \n Some unexpected error occured");
      }
      finally {
        props.onHide(false);
      }
    }
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={amountClear}
      onEnter={clearAll}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Expense
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Form ref={form}>
            {!successful &&
              <div>
                <div id='label'><label htmlFor="payer" className="control-label"><b>Payer</b></label>
                  <select className="custom-select" onChange={onChangePayer} required={true} name='payer' data-testid='payer-drop-down'>
                    <option disabled selected value > -- Select an option -- </option>
                    {allUsersPayers === null && props.otherUsers !== null && props.user !== null ? setAllUsersPayers(props.otherUsers.concat(props.user)) : null}
                    {allUsersPayers !== null ?
                      allUsersPayers.map((currentUser, index) => <option value={index} >{currentUser.name + " (" + currentUser.phoneNumber + ")"}</option>)
                      : null}
                  </select>
                </div>
                <div id='label'>
                  <label htmlFor="amount" className="control-label"><b>Amount</b></label>
                  <Input type="number" className="form-control" id="amount" required={true} placeholder="Total Amount Spent"
                    name='amount' value={amount} onChange={onChangeAmount} validations={[validAmount]} />
                </div>
                <div id='label'>
                  <label htmlFor="description" className="control-label"><b>Description</b></label>
                  <Input type="text" className="form-control" id="description" required={true} placeholder="Description"
                    name='description' value={description} onChange={onChangeDescription} validations={[validDescription]} />
                </div>
                <div id='label'>
                  <label htmlFor="dentor" className="control-label"><b>Debtors</b></label>
                  <select className="custom-select" onChange={onChangeDebtors} isMulti={true} data-testid='debtor-drop-down' showNewOptionAtTop={true}>
                    {allUsersDebtors === null && props.otherUsers !== null && props.user !== null ? setAllUsersDebtors(props.otherUsers.concat(props.user).concat(dummyUser)) : null}
                    <option disabled selected value> -- Select an option -- </option>
                    {allUsersDebtors !== null ?
                      (allUsersDebtors.map((currentUser, index) =>
                        (currentUser.name !== undefined ? (<option value={index} >{currentUser.name + " (" + currentUser.phoneNumber + ")"}</option>) : null)))
                      : null}
                  </select>
                </div>
                <div id='label'>
                  {(debtors.map((item, index) => item.name)).toString()}
                </div>
              </div>
            }
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button id='cancel' variant="danger" size="lg" onClick={close}>Cancel</Button>
        <Button variant="success" size="lg" onClick={handleRegister}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddExpenseForm;