import { Project, IProject, role, status } from "./classes/Project"
import { ProjectManager } from "./classes/ProjectManager"
import { closeModal, showModal, toggleModal, } from "./classes/Modal"
import { Todo, ITodo, todostatus } from "./classes/TodoClass"

// Import the changeColorIcon function
const colorArray = ['blue', 'green', 'red', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'grey'];
function changeColorIcon() {
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    return color;
}
import { v4 as uuidv4 } from 'uuid';


const projectlistUI = document.getElementById("project-list") as HTMLDivElement
const projectManager = new ProjectManager(projectlistUI)



// KLickar på knappen "New Project" och skapar en ny div med klassen "project" 
const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => { showModal("new-project-modal") })
} else {
    console.warn("No new project button found")
}


// Sidebar Navigation
const projectPage = document.getElementById("project-page") as HTMLDivElement;
const projectDetailsPage = document.getElementById("project-details") as HTMLDivElement;

// Get all navigation buttons
const navButtons = document.querySelectorAll('.nav-button') as NodeListOf<HTMLButtonElement>;

// Add click event listeners to all nav buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach(btn => btn.parentElement?.classList.remove('active'));

        // Add active class to clicked button
        button.parentElement?.classList.add('active');

        // Handle page navigation based on data-page attribute
        const page = button.getAttribute('data-page');

        switch (page) {
            case 'home':
                projectPage.style.display = "flex";
                projectDetailsPage.style.display = "none";
                break;
            case 'projects':
                projectPage.style.display = "flex";
                projectDetailsPage.style.display = "none";
                break;
            case 'dashboard':
                projectPage.style.display = "none";
                projectDetailsPage.style.display = "flex";
                break;
            case 'tasks':
                projectPage.style.display = "none";
                projectDetailsPage.style.display = "flex";
                break;
            case 'analytics':
                projectPage.style.display = "none";
                projectDetailsPage.style.display = "flex";
                break;
            case 'settings':
                // Handle settings page
                console.log('Settings clicked');
                break;
            case 'help':
                // Handle help page
                console.log('Help clicked');
                break;
            default:
                projectPage.style.display = "flex";
                projectDetailsPage.style.display = "none";
        }
    });
});


const projectForm = document.getElementById("new-project-form")

if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (event) => {
        event.preventDefault() // förhindrar att sidan laddas om
        const formData = new FormData(projectForm) // skapar en ny instans av FormData
        const projectProperty: IProject = { // skapar en ny variabel med objektet
            description: formData.get("description") as string, // hämtar värdet från inputfälten
            name: formData.get("name") as string,  // hämtar värdet från inputfälten
            role: formData.get("role") as role,// hämtar värdet från inputfälten och giltigöra att det är av typen role
            status: formData.get("status") as status, // hämtar värdet från inputfälten och giltigöra att det är av typen status
            date: new Date(formData.get("date") as string), //
        }

        try {

            const project = projectManager.newProject(projectProperty) // skapar en ny variabel som är av typen projectManager och kallar på metoden newProject
            projectForm.reset() // rensar inputfälten
            toggleModal("new-project-modal")
            console.log(project)

        } catch (error) {
            const warningModal = document.getElementById("pop-up-modal") as HTMLDialogElement;
            if (warningModal) {
                warningModal.showModal();
                console.log(error)
            }

            const closeBtnPopup = document.getElementById("close-pop-up-btn");
            if (closeBtnPopup) {
                closeBtnPopup.addEventListener("click", () => {
                    warningModal.close();
                });
            }
        }
    }) //end of eventlistener

    const closeBtn = document.getElementById("close-btn") as HTMLButtonElement
    const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement

    if (closeBtn) {
        closeBtn.addEventListener("click", (event) => { closeModal("new-project-modal") })
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", (event) => { closeModal("new-project-modal") })
    }

    closeModal("new-project-modal")


} else {
    console.warn("No project form found")
}

//M2-Assignment Q#7
const exportBtn = document.getElementById("export-btn")
if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        projectManager.exportToJSON();
    })
}



const importBtn = document.getElementById("import-btn")
if (importBtn) {
    importBtn.addEventListener("click", () => {
        projectManager.importJSON()
    })
}


const editbtn = document.getElementById("edit-button")
if (editbtn) {
    editbtn.addEventListener("click", () => { showModal("edit-project-modal") })
} else {
    console.warn("No new project button found")
}

//M2-Assignment Q#5
const editForm = document.getElementById("edit-project-form") as HTMLFormElement
if (editForm instanceof HTMLFormElement) {
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(editForm);
        /* const projectID =  projectManager.id */
        if (!projectManager.id) {
            throw new Error("No project ID found");
        }
        const projectToUpdate = projectManager.getProject(projectManager.id)

        if (projectToUpdate) {
            projectToUpdate.description = formData.get("description") as string,
                projectToUpdate.name = formData.get("name") as string,  // hämtar värdet från inputfälten
                projectToUpdate.role = formData.get("role") as role,// hämtar värdet från inputfälten och giltigöra att det är av typen role
                projectToUpdate.status = formData.get("status") as status, // hämtar värdet från inputfälten och giltigöra att det är av typen status
                projectToUpdate.date = new Date(formData.get("date") as string) //
        }

        try {
            if (projectToUpdate) {
                projectManager.setDetailsPage(projectToUpdate, projectManager.id); // Call the setDetailsPage method with the project and project.id
                projectToUpdate.setUI()
                editForm.reset(); // Reset the input fields
                toggleModal("edit-project-modal");
                console.log(projectToUpdate);
            }
        } catch (error) {
            // Handle the error
        }

        const warningModal = document.getElementById("pop-up-modal") as HTMLDialogElement;
        if (warningModal) {
            warningModal.showModal();
        }

        const closeBtnPopup = document.getElementById("close-pop-up-btn");
        if (closeBtnPopup) {
            closeBtnPopup.addEventListener("click", () => {
                warningModal.close();
            });
        }

    })
};

const closeBtn = document.getElementById("edit-close-btn") as HTMLButtonElement
closeBtn.addEventListener("click", (event) => { closeModal("edit-project-modal") })
closeModal("edit-project-modal")
console.log(closeBtn)






//M2-Assigment-Q#6 ADD TODO
const addTodo = document.getElementById("addTodo") as HTMLButtonElement
if (addTodo) {
    addTodo.addEventListener("click", () => { showModal("T-Do-project-modal") })
} else {
    console.warn("No new project button found")
}



//M2-Assigment-Q#6
const todDoForm = document.getElementById("T-Do-project-form") as HTMLFormElement
todDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //M2-Assigment-Q#9
    const toDoListDiv = document.querySelector(".dashboard-card-todo") as HTMLDivElement;

    const formData = new FormData(todDoForm);
    const todoDate = new Date(formData.get("date") as string);
    const todoData: ITodo = {
        id: uuidv4(),
        name: formData.get("name-todo") as string,
        description: formData.get("description-todo") as string,
        status: formData.get("Todostatus") as todostatus,
        date: todoDate,
        ui: toDoListDiv
    }
    const toDoObject = new Todo(toDoListDiv, todoData, new Date(formData.get("date") as string));

    try {
        toDoObject.setUI(toDoObject.id);
        console.log("created");
    } catch {
        console.log("warning");
    }

    const todoDiv = document.querySelector(".toDoElement") as HTMLDivElement;

    if (todoDiv && todoData.status) {
        if (todoData.status === "pending") {
            todoDiv.style.backgroundColor = "green";
            todoDiv.style.color = "white";
        } else if (todoData.status === "closed") {
            todoDiv.style.backgroundColor = "red";
        }
    }

    closeModal("T-Do-project-modal");
    todDoForm.reset();
    console.log(toDoObject);
}

)
