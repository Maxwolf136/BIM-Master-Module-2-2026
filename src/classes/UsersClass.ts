import { v4 as uuidv4 } from "uuid";


export type UserRole = "Admin" | "Manager" | "Developer" | "Designer"
export type UserStatus = "Active" | "Inactive"



export interface IUser {
    name: string,
    email: string,
    userRole: UserRole,
    status: UserStatus,

}


export class User implements IUser {
    name: string;
    email: string;
    userRole: UserRole;
    status: UserStatus;
    id: string;
    userList: [] = []
    ui: HTMLTableRowElement


    constructor(data: IUser) {
        this.name = data.name
        this.email = data.email
        this.userRole = data.userRole
        this.id = uuidv4()
        this.status = data.status;
        this.userList = [];
        this.ui = this.setUI()
    }

    setUI() {
        if (this.ui) { return this.ui }
        this.ui = document.createElement("tr") // skapar en ny div
        this.ui.className = "dashboard-card" // ger ui div:en klassen "project-card" och ger CSS-style enligt classen
        this.ui.style.borderBottom = "1px solid #e5e7eb";

        //M2-Assignment Q#1
        this.ui.innerHTML = ` 
                <td style="padding: 16px 20px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div
                            style="width: 40px; height: 40px; border-radius: 50%; background-color: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            JD</div>
                        <span style="font-weight: 500; color: #111827;">${this.name}</span>
                    </div>
                </td>
                <td style="padding: 16px 20px; color: #6b7280;">${this.email}</td>
                <td style="padding: 16px 20px; color: #374151;">${this.userRole}</td>
                <td style="padding: 16px 20px;">
                    <span
                        style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;">${this.status}</span>
                </td>
                <td style="padding: 16px 20px; text-align: right;">
                    <button class="text-blue-600 hover:text-blue-800 mr-4 transition-colors"><i
                            class="fa-solid fa-pen"></i></button>
                    <button class="text-red-600 hover:text-red-800 transition-colors"><i
                            class="fa-solid fa-trash"></i></button>
                </td>
`
        return this.ui;
    }
}