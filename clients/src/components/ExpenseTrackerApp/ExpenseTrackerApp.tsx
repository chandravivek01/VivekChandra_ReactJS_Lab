import React, { useEffect, useState } from 'react'
import { getAllExpenseItems } from '../../services/ExpenseService';
import ExpenseItems from '../expenseItems/ExpenseItems';
import { Container } from 'react-bootstrap';
import IExpenseItem from '../../models/expense';
import ExpenseByPayee from '../ExpenseByPayee';
import ExpenseCreator from '../ExpenseCreator';
import { headerStyle } from './ExpenseTrackerAppStyle';

const ExpenseTrackerApp = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

    useEffect(() => {

        const getAllExpenseItemsInvoker = async () => {

            const response = await getAllExpenseItems();
            // console.log(`Response is ` + JSON.stringify(response));
            setExpenseItems(response);
        }
        getAllExpenseItemsInvoker();
    }, [])

    return (
        <Container>
            <h2 >
                <div className="text-center mt-3 p-3" style={headerStyle}>ExpenseTrackerApp</div>
                <ExpenseCreator expenseItems={expenseItems}></ExpenseCreator>
                <br />
            </h2>
            <ExpenseItems expenseItems={expenseItems} />
            <ExpenseByPayee expenseItems={expenseItems} />
        </Container>
    )
}

export default ExpenseTrackerApp;