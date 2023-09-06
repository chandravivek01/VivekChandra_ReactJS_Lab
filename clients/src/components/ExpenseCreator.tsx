import React, { FormEvent, useRef, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import IExpenseItem, { IExpenseCreateItem } from '../models/expense'
import { getAllPayeeNames, postExpenseItem } from '../services/ExpenseService'

type ExpenseCreatorModel = {
    expenseItems: IExpenseItem[]
}

// Designing the form to accept user-inputs
const ExpenseCreator = ({ expenseItems }: ExpenseCreatorModel) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const expenseDescriptionRef = useRef<HTMLInputElement>(null);
    const payeeNameRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const expenseDateRef = useRef<HTMLInputElement>(null);

    const createForm = (expenseItems: IExpenseItem[]) => {

        const handleNewExpense = async (event: FormEvent<HTMLFormElement>) => {

            const expenseDescription = (expenseDescriptionRef?.current?.value as string);
            const payeeName = (payeeNameRef?.current?.value as string);
            const price = parseFloat(priceRef?.current?.value as string);
            const date = new Date(expenseDateRef?.current?.value as string);

            const newExpenseItem: IExpenseCreateItem = {
                expenseDescription,
                payeeName,
                price,
                date
            }
            const response = await postExpenseItem(newExpenseItem);
            handleClose();
        }

        return (
            <Form onSubmit={handleNewExpense}>

                <Form.Group className="mb-3" controlId="payeeName">
                    <Form.Label>Name</Form.Label>
                    <Form.Select aria-label="Default select example" ref={payeeNameRef}>
                        <option>Choose</option>
                        {
                            getAllPayeeNames(expenseItems).map((payeeName) => <option key={payeeName} value={payeeName}>{payeeName}</option>)
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="expenseDescription">
                    <Form.Label>Expense Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter expense description"
                        ref={expenseDescriptionRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter expense price" ref={priceRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expenseDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" ref={expenseDateRef} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Expense
                </Button>
                <Button className='mx-2' variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Form>
        )
    }
    return (
        <div>
            <br />
            <Button variant="primary" className='float-end' onClick={handleShow}>
                New Expense Item
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: 'lightgreen' }} closeButton>
                    <Modal.Title>Add New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {createForm(expenseItems)}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ExpenseCreator