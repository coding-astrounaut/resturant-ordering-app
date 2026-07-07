import menuArray from './data.js'

//number of items in the order
let orders = []
let totalPrice = 0

document.addEventListener('click', handleClick)

function handleClick(e) {
    if(e.target.dataset.add){
        handleAddToOrder(e.target.dataset.id)
    }else if (e.target.dataset.remove){
        handleRemoveFromOrder(e.target.dataset.item)
    }
}

function generateMenuElements(menu) {
    return menu.map(function(food){
        // Generate HTML element for each food item
        return `
        <div class="menu-item">
            <div class="menu-item-content">
                <div class="menu-item-emoji">${food.emoji}</div>
                <div class="menu-item-details">
                    <h3 class="menu-item-name">${food.name}</h3>
                    <p class="menu-item-ingredients">${food.ingredients.join(', ')}</p>
                    <p class="menu-item-price">$${food.price}</p>
                </div>
            </div>
            <button class="add-to-order-btn" data-id="${food.id}" data-add="true">+</button>
        </div>
        `
    })
}

function renderMenu() {
    const menu = document.getElementById('menu')
    menu.innerHTML = generateMenuElements(menuArray).join('')
}

function renderOrder() {
    const order = document.getElementById('payment')
    if(totalPrice){
        // Render order details
        order.style.display = 'block'
        renderAddedItems(generatePriceComp())
        RenderTotalPrice()
        
    } else {
        order.style.display = 'none'
    }
}

function handleAddToOrder(foodId) {

    const food = menuArray.find(item => item.id === Number(foodId))

    const foodObj = {name: food.name, price: food.price, id: orders.length}
    orders.push(foodObj)
    calcTotalPrice()
    renderOrder()
}

function renderAddedItems(html) {
    document.getElementById('items').innerHTML = html
}

function calcTotalPrice(){
    totalPrice = orders.reduce((total, currentItem) => total += currentItem.price, 0)
}

function RenderTotalPrice(){
    document.getElementById('total').innerHTML = `
        <div class='price-line'>
            <h3 class='price-name'>Total price:</h3>
            <h4 class='order-item-price'>$${totalPrice}</h4>
        </div>
    `
}

function handleRemoveFromOrder(itemId) {
    const index = orders.indexOf(orders.find(item => item.id == itemId))
    if (index > -1) { // only splice array when item is found
        orders.splice(index, 1); // 2nd parameter means remove one item only
    }
    calcTotalPrice()
    renderOrder()
}

function generatePriceComp() {
    return orders.map(item => {return `<div class='price-line'>
                <div class='price-item'>
                    <h3 class='price-name'>${item.name}</h3>
                    <button class='price-remove-btn' data-item='${item.id}' data-remove="true">remove</button>
                </div>
                <h4 class='order-item-price'>$${item.price}
            </div>`}).join('')
}

function handleBasketRender() {

}

renderMenu()