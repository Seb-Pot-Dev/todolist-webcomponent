class TodoList extends HTMLElement {
	constructor() {
		super();

		// Ajouter les styles
		const style = document.createElement("style");
		style.textContent = `
      div {
        font-family: Arial, sans-serif;
        background: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        margin: 20px auto;
      }
      input {
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 70%;
      }
      button {
        padding: 8px;
        margin-right: 5px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .complete-button {
        background-color: #28a745;
      }
      .delete-button {
        background-color: #dc3545;
      }
      button:hover {
        opacity: 0.8;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin: 10px 0;
        padding: 10px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      li button {
        background-color: #dc3545;
        margin-left: 10px;
      }
    `;

		//attacher un shadow DOM au composant
		this.attachShadow({ mode: "open" });
        // Ajouter le style au shadow DOM
		this.shadowRoot.appendChild(style);

		//créer un conteneur pour le composant
		const container = document.createElement("div");

		//Créer un champ d'entrée pour ajouter une tache
		this.input = document.createElement("input");
		this.input.type = "text";
		this.input.placeholder = "Ajouter une nouvelle tache";

		//créer un bouton pour ajouter une tache
		this.addButton = document.createElement("button");
		this.addButton.textContent = "Ajouter";

		//Créer un conteneur pour la liste des taches
		this.taskList = document.createElement("ul");

		//ajouter les éléments au conteneur
		container.appendChild(this.input);
		container.appendChild(this.addButton);
		container.appendChild(this.taskList);

		//Ajouter le conteneur au shadow DOM
		this.shadowRoot.appendChild(container);

		//Ajouter un écouteur d'événements pour ajouter une tache lorsque le bouton est cliqué
		this.addButton.addEventListener("click", () => {
			this.addTask();
		});
	}

	addTask() {
		const taskText = this.input.value.trim();
		if (taskText) {
			const taskItem = document.createElement("li");
			taskItem.textContent = taskText;

			//Ajouter un bouton pour marquer la tâche comme complétée
			const completeButton = document.createElement("button");
            completeButton.classList.add("complete-button");
			completeButton.textContent = "✔";
			completeButton.addEventListener("click", () => {
				this.markTaskComplete(taskItem);
			});

			//Ajouter un bouton pour supprimer la tache
			const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
			deleteButton.textContent = "❌";
			deleteButton.addEventListener("click", () => {
				this.deleteTask(taskItem);
			});

			//Ajouter les boutons à la tache
			taskItem.appendChild(completeButton);
			taskItem.appendChild(deleteButton);

			//Ajouter la tache à la liste
			this.taskList.appendChild(taskItem);

			//Effacer le champ d'entrée
			this.input.value = "";
		}
	}

	//Fonction pour marquer une tache comme complétée
	markTaskComplete(taskItem) {
		taskItem.style.textDecoration = "line-through";
	}

	//Fonction pour supprimer une tache
	deleteTask(taskItem) {
		this.taskList.removeChild(taskItem);
	}
}

//Définir le web component
customElements.define("todo-list", TodoList);
