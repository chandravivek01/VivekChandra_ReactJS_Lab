// Defining the type of data from the json-file
interface IExpenseItem {
    expenseDescription: string,
    payeeName: string,
    price: number,
    date: Date,
    id: number
}

// User is not required to put id-value from his/her end
export type IExpenseCreateItem = Omit<IExpenseItem, "id">

export default IExpenseItem;