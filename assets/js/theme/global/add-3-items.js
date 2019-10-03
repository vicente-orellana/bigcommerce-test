// perform action after clicking button in header
$('body').on('click', '#add-3-items', event => {
    event.preventDefault();

    // add 3 items to cart, 2 with options and 1 without
    postData(`/api/storefront/carts/`, {
        "lineItems": [
        {
            "quantity": 1,
            "productId": 93,
            "variantId": 56
        },
        {
            "quantity": 1,
            "productId": 77,
            "variantId": 20
        },
        {
            "quantity": 1,
            "productId": 98
        }
        ]}
    )
    .then(data => console.log(JSON.stringify(data))) 
    .catch(error => console.error(error));

    // get user's cart ID
    function getCartId(url = '') {
        return fetch(url, {
            credentials: 'include'
        })
        .then(response => response.json())
        // check if a cart exists based on length of response
        .then(myJson => myJson.length ? myJson[0].id : '')
        // retrieve cart id as a string
        .then(data => JSON.parse(JSON.stringify(data)));
    }

    // post data to cart
    function postData(url = ``, cartItems = {}) {
        // add items to either existing cart or new cart (based on if we can retrive a cart id)
        return getCartId(url)
        .then(cartId => fetch(url + (cartId ? cartId + '/items/' : ''), {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json" },
            body: JSON.stringify(cartItems), 
        }))
        .then(response => response.json())
        .then(() => alert("Added 3 items to the cart."))
        .then(() => window.location.replace('/cart.php'));
    }
});