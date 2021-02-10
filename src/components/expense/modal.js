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
    setDebtors(debtors.concat({ id: allUsersDebtors[index].id, name: allUsersDebtors[index].name, phoneNumber: allUsersDebtors[index].phoneNumber }));
    const temp = allUsersDebtors;
    temp.splice(index, 1);
    setAllUsersDebtors(temp);
  }

  async function handleRegister(e) {
    e.preventDefault();
    console.log(description);
    console.log(amount);
    console.log(payerId);
    console.log(debtors);

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
        let response = await addExpense({ token, description, amount, payerId, debtorIds });
        if (response.status === 200) {
          let res = await response.json();
          props.setRes(res);
          props.setResState();
        } else {
          if (response.status === 401) {
            alert("The expense creation was not successful \n Please login again")
          } else {
            alert("The expense creation was not successful");
          }
        }
      }
      catch (error) {
        alert("The expense creation was not successful \n Some unexpected error occured");
      }
      finally {
        setDescription('');
        setAmount(0);
        setAllUsersDebtors(null);
        setAllUsersPayers(null);
        setDebtors([]);
        setPayerId(null);
        props.onHide();
      }
    }
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
                <div>
                  <label htmlFor="payer" className="control-label">Payer Name</label>
                  <select className="custom-select" onChange={onChangePayer} required={true}>
                    <option disabled selected value> -- Select an option -- </option>
                    {allUsersPayers === null && props.otherUsers !== null && props.user !== null ? setAllUsersPayers(props.otherUsers.concat(props.user)) : null}
                    {allUsersPayers !== null ?
                      allUsersPayers.map((currentUser, index) => <option value={index} >{currentUser.name + " (" + currentUser.phoneNumber + ")"}</option>)
                      : null}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="control-label">Description</label>
                  <Input type="text" className="form-control" id="description" required={true} placeholder="Description"
                    name='description' value={description} onChange={onChangeDescription} validations={[validDescription]} />
                </div>
                <div className="form-group">
                  <label htmlFor="amount" className="control-label">Amount</label>
                  <Input type="number" className="form-control" id="amount" required={true} name='amount'
                    placeholder="Total Amount Spent"
                    value={amount} onChange={onChangeAmount} validations={[validAmount]} />
                </div>
                <div>
                  <label htmlFor="dentor" className="control-label">Debtor Names</label>
                  <select className="custom-select" onChange={onChangeDebtors} required={true}>
                    {allUsersDebtors === null && props.otherUsers !== null && props.user !== null ? setAllUsersDebtors(props.otherUsers.concat(props.user).concat(dummyUser)) : null}
                    <option disabled selected value> -- Select an option -- </option>
                    {allUsersDebtors !== null ?
                      (allUsersDebtors.map((currentUser, index) =>
                        (currentUser.name !== undefined ? (<option value={index} >{currentUser.name + " (" + currentUser.phoneNumber + ")"}</option>) : null)))
                      : null}
                  </select>
                </div>
                <div>
                  {(debtors.map((item, index) => item.name)).toString()}
                </div>
              </div>
            }
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-left">
          <Button variant="danger" size="lg" className="float-left" onClick={props.onHide}>Cancel</Button>
        </div>
        <Button variant="success" size="lg" onClick={handleRegister}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddExpenseForm;