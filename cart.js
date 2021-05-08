toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


const cartQuantity = document.querySelector('#cart-quantity');

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
cartQuantity.innerHTML = cart.length;

let productItem = {};

function pickOption(item) {
    productItem = item;
}

function addToCart() {
    console.log(productItem)
    if (productItem.id) {
        cart.push(productItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        toastr["success"]("Item has been successfully added to cart!")
        cartQuantity.innerHTML = cart.length;
    }
    else {
        toastr["warning"]("Please select a product option!");
    }
}

function saveToCart() {
    toastr["warning"]("Please select a product!");
    toastr["success"]("Product successfully added!")
}

const cartQuantityb = document.querySelector('#cart-quantity-b');
const cartTotal = document.querySelector('#cart-total-b');
const cartBody = document.querySelector('#cart-body');

function showCart() {
    cartBody.innerHTML = generateCartItemHtml(cart);
    cartQuantityb.innerHTML = cart.length;
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    cartTotal.innerHTML = format2(total, ' VND');
}

function generateCartItemHtml(items) {
    return items.map(item => {
        return `  
        <p>
             <a href="javascript:void(0)">${item.name}</a><span class="price">${format2(item.price, ' VND')}</span>
        </p>
        `;
    }).join(" ")
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    cartBody.innerHTML = "";
    cartQuantity.innerHTML = 0;
    cartQuantityb.innerHTML = 0;
    cartTotal.innerHTML = 0;
}

function checkOut() {
}

if (window.location.href.indexOf('ThankYou') != -1) {
    clearCart();
}

if (window.location.href.indexOf('Checkout') != -1) {
    showCart();
}

function format2(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}
