// products

db.collection('product').limit(10).get().then((data) => {

    $('#productCount').html(data.docs.length);

    data.forEach((productData) => {

    })
}).then(() => {
    $('.loader').css('display', 'none');
})


// Category

db.collection('category').get().then((data) => {

    $('#categoryCount').html(data.docs.length);

    data.forEach((productData) => {

    })
})

// Users

db.collection('userCollection').limit(10).get().then((data) => {

    $('#usersCount').html(data.docs.length);
    let i = 0;
    data.forEach((userData) => {



        let users = userData.data();

        $('#usersList').append(`
        
                    <li class="d-flex mb-4 pb-1">
                        <div class="avatar flex-shrink-0 me-3" id="avatarImg${i}">
                        
                        </div>
                        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                            <div class="me-2">
                            <small class="text-muted d-block mb-1">${users.email}</small>
                            <h6 class="mb-0">${users.name}</h6>
                            </div>
                            <div class="user-progress d-flex align-items-center gap-1">
                            <span class="text-muted">Member Since</span>
                            <h6 class="mb-0">${users.registerYear}</h6>
                            </div>
                        </div>
                    </li>
    
    `)

        if (users.image) {

            $(`#avatarImg${i}`).append(`
        <img src="${users.image}" alt="User" class="rounded" />
        `)
        } else {
            $(`#avatarImg${i}`).append(`
        <img src="https://i.ibb.co/2vXQ7j2/Png-Item-307416.png" alt="User" class="rounded" />
        `)
        }

        i++

    })
});



// Banners


db.collection('banner').get().then((data) => {
    data.forEach((banner) => {


        $('#bannersList').append(`
        
            <li class="d-flex mb-4 pb-1">
                            <div class="avatar flex-shrink-0 me-3">
                                <img src="${banner.data().bannerImage}" alt="User" class="rounded" />
                            </div>
                            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div class="me-2">
                                
                                <a href="../add-banner.html" class="mb-0">${banner.data().bannerTitle}</a href="../add-banner.html">
                                </div>
                            
                            </div>
                            </li>

            `)
    })
});


// Orders
db.collection('orderCollection').where("isPending", "==", true).get().then((data) => {

    let dataLength = data.docs.length;
    let j = 0;

    data.forEach((orderData) => {
        console.log(orderData.data());
        let order = orderData.data().cartModel;


        for (let i = 0; i < order.length; i++) {
            const element = order[i];
            var size = Object.keys(element).length;


            $('#ordersList').append(`
        
                    <a href="../order-details.html?id=${orderData.data().orderID}"> <li class="d-flex mb-4 pb-1">
                    <div class="avatar flex-shrink-0 me-3">
                    <img src="${element.productDetails.images}" alt="User" class="rounded" />
                    </div>
                    <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                    <div class="me-2">
                        <small class="text-muted d-block mb-1">Paypal</small>
                        <h6 class="mb-0">Send money</h6>
                    </div>
                    <div class="user-progress d-flex align-items-center gap-1">
                        <h6 class="mb-0">${element.productDetails.price}</h6>
                        <span class="text-muted">AED</span>
                    </div>
                    </div>
                </li> <a/>
        
        `)
            if (orderData.data().isPending) {

                $(`#orderStatus${j}`).html('<span class="badge bg-primary">Pending</span>')

            } else {
                $(`#orderStatus${j}`).html('<span class="badge bg-success">Delivered</span>')

            }

            j++






        }




    })
})