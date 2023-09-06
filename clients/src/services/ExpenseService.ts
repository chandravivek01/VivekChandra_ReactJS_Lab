import axios from "axios"
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

const baseUrl = process.env.REACT_APP_BASE_URL;

// get-request to fetch data from the json-file
export const getAllExpenseItems = async () => {

    // "http://localhost:4000/expenses?_sort=id&_order=desc"
    const GET_EXPENSE_ITEMS_URL = `${baseUrl}?_sort=id&_order=desc`;
    const response = await axios.get<IExpenseItem[]>(GET_EXPENSE_ITEMS_URL);
    return response.data;
}

// post-request to insert data to the json-file
export const postExpenseItem = async (newExpenseItem: IExpenseCreateItem) => {

    const POST_EXPENSE_ITEMS_URL = `${baseUrl}`;
    const response = await axios.post<IExpenseItem[]>(POST_EXPENSE_ITEMS_URL, newExpenseItem, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const getAllPayeeNames = (expenseItems: IExpenseItem[]): string[] => {

    const uniquePayeeNames: string[] = [];
    expenseItems.forEach((expenseItem) => {

        let payeeName = expenseItem.payeeName;
        if (!uniquePayeeNames.includes(payeeName))
            uniquePayeeNames.push(payeeName);
    });
    return uniquePayeeNames;
} 