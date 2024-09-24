const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Recuperando UL
const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

// Capiturando Input para formatar o valor
amount.oninput = () => {
    //Removendo letras do amount
    let value = amount.value.replace(/\D/g, "")

    //transformar em centavos
    value = Number(value) / 100
    
    amount.value = formatCurrencyBRL(value)
}

// Convertendo para R$
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",    
    })

    return value

}

// Criando Submit com todos os elementos
form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getDay(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),

    }

    expenseAdd(newExpense)
    
}

// Adicione um novo item a lista
function expenseAdd(newExpense) {
    try {
        //Criando elemento ICON na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //criando o icone(img) para adicionar a (ul)
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Criando Amount para adicionar a (ul)
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Criando info para adicionar a (ul)
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)

        const expenseRemove = document.createElement("img")
        expenseRemove.classList.add("remove-icon")
        expenseRemove.setAttribute("src", `./img/remove.svg`)
        expenseRemove.setAttribute("alt", `remover`)


        //Adicionando Atributo Icon(img) no Item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount,expenseRemove)

        //Adicionando Elemento criado a (ul)
        expenseList.append(expenseItem)

        updateTotals()
        clearForm()

    } catch (error) {
        alert("Não foi possivel inserir sua despesa, tente novamente..")
        console.log(error)
    }
}

// Calculo quantidade de itens na lista
function updateTotals(){
    try {
        //Recupera todos itens da lista
        const items = expenseList.children

        //Atualiza quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}` 

        //Variavel para incrementar o total
        let total = 0

        //Percorre cada item da lista para somar o valor
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //removendo caracteres nao numericos, e substituir "," por "."
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            //converter valor para float
            value = parseFloat(value)

            if(isNaN(value)){
                return alert("O valor provavelmente nao é um número")
            }

            //incrementando o valor total
            total = total + value
        }

        //Cria Span apra adiconar R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        
        //remove o R$ da Funcao para adicionar direto no Small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //limpa conteudo do elemento
        expenseTotal.innerHTML = ""

        //Adiciona o Simbolo da Moeda e o valor Formatado
        expenseTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("Não foi possivel calcular a quantidade de despesas")
    }
}        

//Evendo que capitura o click no item da lista
expenseList.addEventListener("click", function (event) {
    //verifica se o Click esta no Icone Remove
    if(event.target.classList.contains("remove-icon")){

        //Obtem a (li) Pai do elemento clicado
        const item = event.target.closest(".expense")
        item.remove()
    }
    updateTotals()
})

//Funcao para limpar Formulado para nova Adição de itens
function clearForm(){
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}