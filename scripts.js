const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Recuperando UL
const expenseList = document.querySelector("ul")

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

function expenseAdd(newExpense) {
    try {
        //Criando elemento para add(li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //criando o icone(img) para adicionar a (ul)
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Adicionando Atributo Icon(img) no Item
        expenseItem.append(expenseIcon)

        //Adiciooando Elemento criado a (ul)
        expenseList.append(expenseItem)
        


    } catch (error) {
        alert("Não foi possivel inserir sua despesa, tente novamente..")
        console.log(error)
    }
}