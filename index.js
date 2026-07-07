import menuArray from './data.js'

//number of items in the order
let pizzaCount = 0
let hamburgerCount = 0
let beerCount = 0
let totalPrice = 0

document.addEventListener('click', handleClick)

function handleClick(e) {
    if(e.target.dataset.add){
        handleAddToOrder(e.target.dataset.id)
        console.log(`Pizza: ${pizzaCount}, Hamburger: ${hamburgerCount}, Beer: ${beerCount}, Total Price: $${totalPrice}`)
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
            <button class="add-to-order-btn" data-id="${food.id}" data-add="1">+</button>
        </div>
        `
    })
}

function renderMenu() {
    const menu = document.getElementById('menu')
    menu.innerHTML = generateMenuElements(menuArray).join('')
}

function renderOrder() {
    if(totalPrice){
        // Render order details
        const order = document.getElementById('payment')
        order.style.display = 'block'
    }
}

function handleAddToOrder(foodId) {

    const food = menuArray.find(item => item.id === Number(foodId))

    if (food) {
        switch (food.name) {
            case 'Pizza':
                pizzaCount++
                break
            case 'Hamburger':
                hamburgerCount++
                break
            case 'Beer':
                beerCount++
                break
        }
        totalPrice += food.price
    }
    renderOrder()
}

function handleBasket() {

}

renderMenu()