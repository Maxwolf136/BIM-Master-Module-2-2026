import { v4 as uuidv4 } from 'uuid';
import { Todo } from './TodoClass';


//M2-Assignment Q#2 
const colorArray = ['blue', 'green', 'red', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'grey'];
function changeColorIcon() {
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    return color;
}


// För att det är valbara alternativ
export type role = "Admin" | "Manager" | "Developer" | "Designer"
export type status = "pending" | "closed" | "archived"


export interface IProject {
    name: string
    description: string
    role: role // role: role
    status: status // status: status
    date: Date
}


export class Project implements IProject {
    name!: string
    description!: string
    role!: role
    status!: status
    date!: Date
    ui!: HTMLDivElement
    cost: number = 0
    progess: number = 0
    id: string
    //M2-Assigment-#6
    todos: Todo[];



    constructor(data: IProject, date: Date) {
        //M2-Assigment-#6
        this.todos = [];

        // Project card Property definition using for...of
        const keys = Object.keys(data) as (keyof IProject)[];
        for (const key of keys) {
            if (key === 'date' && !data[key]) {
                continue; // keep the logic for fallback date
            }
            (this as any)[key] = data[key];
        }

        if (!this.date) {
            this.date = date;
        }



        //UNIK ID per Projekt
        this.id = uuidv4();
        //Set UI for Project-card
        this.nameToLong();

        this.setUI()


    }
    //M2-Assigment Q#3
    nameToLong() {
        if (this.name.length > 5) {
            throw new Error("för långt namn");
        }
    }

    //M2-Assigment Q#7
    addTodo(todo: Todo) {
        this.todos.push(todo)
    }

    setUI() {
        if (this.ui) { return }
        this.ui = document.createElement("div") // skapar en ny div
        this.ui.className = "project-card" // ger ui div:en klassen "project-card" och ger CSS-style enligt classen
        //M2-Assignment Q#2
        const randomColor = changeColorIcon()

        //M2-Assignment Q#1
        this.ui.innerHTML = ` 
    <div class="card-header">  
    <p style="background-color: ${randomColor}; padding: 10px; border-radius: 8px; aspect-ratio: 1;">${this.name.slice(0, 2)}</p>
                <div>
                <h5>${this.name}</h5>
                <p>${this.description}</p>
                </div>
            </div>
            <div class="card-content">
                <div class="card-property">
                <p style="color: #969696;">Status</p>
                <p>${this.status}</p>
                </div>
                <div class="card-property">
                <p style="color: #969696;">Role</p>
                <p>${this.role}</p>
                </div>
                <div class="card-property">
                <p style="color: #969696;">Cost</p>
                <p>$${this.cost}</p>
                </div>
                <div class="card-property">
                <p style="color: #969696;">Estimated Progress</p>
                <p>${this.progess * 100} %</p>
                </div>
            </div>
`}
}

