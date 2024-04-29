let btnAdd = document.getElementById("btnAdd");

btnAdd.addEventListener("click", addTask);

function deleteItem(event) {
    event.target.parentNode.remove();
    updateStatus(getTodoTasks(), getDoneTasks());
}

function updateStatus(todoList, doneList) {
    let totalDone = doneList.childNodes.length
    let totalTarefas = todoList.childNodes.length + totalDone;
    let status = document.getElementById("status");
    status.textContent = `${totalDone} of ${totalTarefas} done`;
}

function doneTask(event) {
    let item = event.target.parentNode;
    getDoneTasks().appendChild(event.target.parentNode);
    //faz aparecer o botao de deletar
    item.lastChild.classList.remove("hideElement");
    //usa o mesmo css para fazer o checkbox sumir
    item.firstChild.classList.add("hideElement");
    item.classList.add("taskDone");
    updateStatus(getTodoTasks(), getDoneTasks());
}

function getTodoTasks() {
    return document.getElementById("ulTarefas");
}

function getDoneTasks() {
    return document.getElementById("ulFeitas");
}

function createListItem(text) {
    //criando o item da lista
    let ul = document.createElement("li");
    let textItem = document.createTextNode(text);

    //criando a checkbox do item da lista
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.addEventListener("click", doneTask)

    //criando botao de deletar do item da lista
    let btn = document.createElement("button");
    let textBtn = document.createTextNode("deletar");
    btn.addEventListener("click", deleteItem);
    btn.classList.add("hideElement");
    btn.appendChild(textBtn);

    //adicionando todos os elementos ao item
    ul.append(check, textItem, btn);

    return ul;
}

function inputReset(input) {
    input.value = "";
    input.focus();
}

function itemExists(list, text) {
    let listItems = Array.from(list.childNodes);

    let arrayResultado = listItems.filter((item) => {
        return item.firstChild.nextSibling.textContent === text;
    });

    return arrayResultado.length > 0;
}

function addTask() {
    let inpDesc = document.getElementById("inpDesc");
    let text = inpDesc.value.trim();

    //verificando se o elemento a ser adicionando nao vai ser uma string vazio ou varios espaços
    if (text == "") {
        alert("erro");
        return;
    }

    if (itemExists(getTodoTasks(), text)) {
        alert("item existente")
        return;
    }

    //adicionando um item da lista
    ulTarefas.appendChild(createListItem(text));
    inputReset(inpDesc);
    updateStatus(getTodoTasks(), getDoneTasks());
}