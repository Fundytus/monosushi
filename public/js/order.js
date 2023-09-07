const url = 'http://localhost:3001/api/v1/orders'
window.addEventListener('load', () => {
    getOrders()
    welcomeUser()
})
const getOrders = () => {
    const tdody = document.querySelector('#tbody');
    tdody.innerHTML = ''
    fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then((data) => {
            let orders = data
            orders.map((order) => {
                tbody.appendChild(createOrderTable(order));
            });
        })
}

const createOrderTable = (order) => {

   let td1 = document.createElement('TD');
   let td2 = document.createElement('TD');
    order.order.map((item) => {
     const orderName = document.createElement('p')
    orderName.innerHTML = `${item.productName}`;
    const orderAmount = document.createElement('p')
    orderAmount.innerHTML = `${item.qty}`;
     td1.append(orderName)
    
    td2.append(orderAmount)
   })

   
    const customer = document.createElement('p')
    customer.innerHTML = `${order.userEmail}`;
    const orderDate= document.createElement('p')
    let data = order.addedOnDate.toString().
  replace(/T/, ' ').replace(/\..+/, '')
    orderDate.innerHTML = `${data}`;

    
   
    let td3 = document.createElement('TD');
    td3.append(customer)
    let td4 = document.createElement('TD');
    td4.append(orderDate)

    let tr = document.createElement('TR');
    tr.appendChild(td1)
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    return tr

}