import React from 'react';
import { Table } from 'react-bootstrap';
import IExpenseItem from '../../models/expense';
import { colorStyle } from './ExpenseItemStyle';
import './rahul.css'

type ExpenseItemsModel = {

    expenseItems: IExpenseItem[]
}

const ExpenseItems = ({ expenseItems }: ExpenseItemsModel) => {

    // Displaying Date in the required format 
    const converDateToString = (dateAsString: Date) => {

        const dateObj = new Date(dateAsString);
        let monthObj = dateObj.getMonth() + 1;
        const month = (monthObj < 10) ? ("0" + monthObj) : monthObj;
        let dayObj = dateObj.getDate();
        const day = (dayObj < 10) ? ("0" + dayObj) : dayObj;
        return day + " - " + month + " - " + dateObj.getFullYear();
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={colorStyle}>#</th>
                        <th style={colorStyle}>Expense Description</th>
                        <th style={colorStyle}>Payee Name</th>
                        <th style={colorStyle}>Expense Date</th>
                        <th style={colorStyle}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenseItems.map((expenseItem, index) => {

                            return (
                                <tr key={expenseItem.id}>
                                    <td>{index + 1}</td>
                                    <td style={{ backgroundColor: 'lightcoral', color: 'white' }}>{expenseItem.expenseDescription}</td>
                                    <td style={expenseItem.payeeName == 'Rahul' ? { backgroundColor: 'lightpink' } : { backgroundColor: 'lightgoldenrodyellow' }}>{expenseItem.payeeName}</td>
                                    <td style={{ backgroundColor: 'lightseagreen', color: 'white' }}>{converDateToString(expenseItem.date)}</td>
                                    <td style={{ backgroundColor: 'lightskyblue', color: 'white' }}>{expenseItem.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ExpenseItems