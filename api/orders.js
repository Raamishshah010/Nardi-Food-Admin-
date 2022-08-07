

db.collection('orderCollection').get().then((data) => {

    let dataLength = data.docs.length;
    let j = 0;
    data.forEach((orderData) => {

        let order = orderData.data().cartModel;
    
        
        for (let i = 0; i < order.length; i++) {
            const element = order[i];
            var size = Object.keys(element).length;
            console.log(element);
            // if (size== dataLength ) {
                $('#orderTable').append(`
        
                <tr>
                            
                <td><img src="${element.productDetails.images}" width="40px" height="40px"/> ${element.productDetails.productName}</td>
                <td>${element.quantity}</td>
                <td>${element.totalPrice}</td>
                <td>${orderData.data().userDetailsModel.name}</td>
                <td id="orderStatus${j}" ></td>
                <td><a href="${url}order-details.html?id=${orderData.data().orderID}" class="btn btn-primary"> View </a></td>
                
                
            </tr>
        
        `)
        if (orderData.data().isPending) {

            $(`#orderStatus${j}`).html('<span class="badge bg-primary">Pending</span>')
            
        }else{
            $(`#orderStatus${j}`).html('<span class="badge bg-success">Delivered</span>')
    
        }
        
        j++

                return;
            }


        

        // }
    



    })
}).then(() =>{
    $('.loader').css('display', 'none');
})






// var settings = {
//     "url": "https://fcm.googleapis.com/fcm/send",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//         "Authorization": "key=AAAAyuNpbpI:APA91bEucdID84w86M0jMuc9lgFqk7ytoDkbomhdc9IXPFYg2RSDDiVrPAsruIrqZMjggzVzmyV0XMCB-FPcQ6NFUNsf1zmLM0BnqwMTKMsNZCx16SFHJ44HMXKdfwy1UVgnMT4drz20",
//         "Content-Type": "application/json"
//     },
//     "data": JSON.stringify({
//         "to": "dIpcs7TeSu2emng3hrORZw:APA91bHz-wyz4FaD5sxAwq91o1cHtE6bD5D5HP8NWeOOE1ltf5e97fKVqZZrT4uGTPlgVl3RP_p08Qq2Ctbd8m-tgeSiqqlcCcKVe5DLxlUAtoJYPK0lOrShV458AW6oc61KkQoPNDkp",
//         "data": {
//             "title": "Ya Marhabaa!!!",
//             "body": "Notifications are working....:)",
//             "sound": "default"
//         },
//         "android": {
//             "priority": "high"
//         },
//         "content_available": true,
//         "apn-priority": 5,
//         "apns": {
//             "payload": {
//                 "aps": {
//                     "sound": "default"
//                 }
//             }
//         }
//     }),
// };

// $.ajax(settings).done(function (response) {
//     console.log(response);
// });