/* Checking if the user has logged in or not */
var addToCartBtn = document.getElementById("add");

addToCartBtn.onclick = () => {
    if (sessionStorage.getItem("loginSuccessful")) {
        return true;
    }
    else {
        alert("You have to log in");
        addToCartBtn.href = "javascript:void(0)";
        return false;
    }
}
