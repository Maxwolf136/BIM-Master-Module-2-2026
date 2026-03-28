import { User, IUser } from '../classes/UsersClass';

export class UserManager {
    // interna clsser/property
    list: User[] = []; // skapar en ny array med typen User
    ui: HTMLDivElement; // själva containern för User
    id: string | null = null;

    // constructor for UserManager class
    constructor(container: HTMLDivElement) {
        this.ui = container;
    }


    newUser(data: IUser) { // skapar en ny metod som tar in data av typen IUser
        const userNames = this.list.map((user) => {
            return user.name;
        });


        //M2-Assigment Q#7
        const user = new User(data);

        const nameInUse = userNames.includes(data.name);
        if (nameInUse) {
            throw new Error(data.name + "finns redan"); // skapar en ny error som skickar ut ett meddelande om att namnet redan finns
        }


        this.list.push(user);
        if (this.ui) {

            this.ui.append(user.ui);
        } else {
            console.error("No UI container found for user");
        }

        return user;
    }

}