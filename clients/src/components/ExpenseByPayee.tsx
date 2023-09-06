import React from 'react'
import { Table } from 'react-bootstrap';
import IExpenseItem from '../models/expense'
import { getAllPayeeNames } from '../services/ExpenseService';
import { colorStyle } from './expenseItems/ExpenseItemStyle';

type ExpenseByPayeeModel = {

    expenseItems: IExpenseItem[]
}

const ExpenseByPayee = ({ expenseItems }: ExpenseByPayeeModel) => {

    const getTotalExpenseByPayee = (payeeName: string) => {

        let totalExpenseByPayee = 0;
        expenseItems.forEach((expenseItem) => {

            if (payeeName === expenseItem.payeeName)
                totalExpenseByPayee += expenseItem.price;
        })
        return totalExpenseByPayee;
    }

    const getGrandTotal = () => {

        let grandTotal = 0;
        expenseItems.forEach((expenseItem) => grandTotal += expenseItem.price);
        return grandTotal;
    }

    // Calculating the pending amount
    const getPendingAmount = (payeeName: string) => {

        const totalExpense = getGrandTotal();
        const totalExpenseByPayee = getTotalExpenseByPayee(payeeName);
        if (totalExpenseByPayee >= (totalExpense / 2))
            return 0;
        else {
            return (totalExpense / 2) - totalExpenseByPayee;
        }
    }
    return (
        <div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={colorStyle}>#</th>
                        <th style={colorStyle}>Payee Name</th>
                        <th style={colorStyle}>Contributed Amount</th>
                        <th style={colorStyle}>Pending Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getAllPayeeNames(expenseItems).map((payeeName, index) => {

                            return (
                                <tr key={payeeName}>
                                    <td>{index + 1}</td>
                                    <td>{payeeName}</td>
                                    <td>{getTotalExpenseByPayee(payeeName)}</td>
                                    <td>{getPendingAmount(payeeName)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td></td>
                        <td>Grand Total</td>
                        <td>{getGrandTotal()}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ExpenseByPayee