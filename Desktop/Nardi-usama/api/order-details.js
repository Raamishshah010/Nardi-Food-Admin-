let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');
let userId1;
let tokenId;
let totalP;
db.collection('orderCollection').doc(myParam).get().then((ordersCollectionData) => {

    userId1 = ordersCollectionData.data().userDetailsModel.docID

    for (let i = 0; i < ordersCollectionData.data().cartModel.length; i++) {
        const element = ordersCollectionData.data().cartModel[i];

        $('#orders').append(`
    
        <div class="image" >
        <img src="${element.productDetails.images}" class="img-fluid" alt="">
        </div>
        <h5 class="mt-5">${element.productDetails.productName}</h5>
        <p>Quantity: ${element.productDetails.productDescription}</p>
        <p>Quantity: ${element.quantity}</p>
        <p>Price: $${element.productDetails.price}</p>
            `)

    


        totalP = element.totalPrice


    }
    let placementDate = ordersCollectionData.data().placementDate.toDate().toString().slice(0, 15);

    $('#details').append(`
    
    <h5>Total Price : AED ${totalP}</h5>
    <p>User:  ${ordersCollectionData.data().userDetailsModel.name}</p>
    <p>Email:  ${ordersCollectionData.data().userDetailsModel.email}</p>
    <p>Contact No:  ${ordersCollectionData.data().userDetailsModel.contactNo}</p>
    <p>Address: ${ordersCollectionData.data().userDetailsModel.houseNumber} , ${ordersCollectionData.data().userDetailsModel.address}</p>
    
    <p>Placement Date: ${placementDate}</p>

    
    
    `)

    if (ordersCollectionData.data().isDelivered) {
        $('#placeOrder').addClass('disabled , light');
    
        $('#placeOrder').html('Delivered');
    }


}).then(() => {
    $('.loader').css('display', 'none');
    db.collection('deviceTokens').doc(userId1).get().then((tokenData) => {

        tokenId = tokenData.data().deviceTokens
        
    })
});








$('#placeOrder').on('click', () => {
    db.collection('orderCollection').doc(myParam).update({

        isActive: true,
        processedDate: Date.now(),
        isDelivered: true,
        isPending: false,
        deliveryDate: Date.now()

    }).then(() => {


        var settings = {
            "url": "https://fcm.googleapis.com/fcm/send",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "key=AAAAyuNpbpI:APA91bEucdID84w86M0jMuc9lgFqk7ytoDkbomhdc9IXPFYg2RSDDiVrPAsruIrqZMjggzVzmyV0XMCB-FPcQ6NFUNsf1zmLM0BnqwMTKMsNZCx16SFHJ44HMXKdfwy1UVgnMT4drz20",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "to": tokenId ,
                "data": {
                    "title": "Order Delivered",
                    "body": "Your Order has been delivered to your address",
                    "sound": "default"
                },
                "android": {
                    "priority": "high"
                },
                "content_available": true,
                "apn-priority": 5,
                "apns": {
                    "payload": {
                        "aps": {
                            "sound": "default"
                        }
                    }
                }
            }),
        };

        $.ajax(settings).done(function () {
            window.alert('Order is ready to be processed');
            window.location.reload();
        });
    });
});
