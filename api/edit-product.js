let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get('id');

let file = null;
let topSaleBool;

var fileButton = document.getElementById('productImage');

fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];

});



db.collection('product').doc(myParam).get().then((productData) => {
    let product = productData.data();

    $('#product_data').append(`

    <div class="top-fan"  >
        <img id="badge" style="transform: translateY(4rem)" src="../assets/img/medal.png"
    </div>
    <div class="image">
    
    <img src="${product.productImage}" class="img-fluid" alt="">
    </div>



    <h5 class="mt-5">${product.productTitle}</h5>
    <small class="mb-5">$${product.productPrice} </small>
    <p>${product.description}</p>
    <p>Delivery Time: ${product.deliveryTime} Mins</p>

    
    `);


    $('#productTitle').val(product.productTitle)
    $('#productPrice').val(product.productPrice)
    $('#deliveryTime').val(product.deliveryTime)
    $('#description').val(product.description)
    $('#imgUrl').val(product.productImage)

    topSaleBool = product.topSale

    console.log(topSaleBool);

if (topSaleBool == false) {
    $('#badge').css('display' , 'none');
    $('#badgeBtn').html('Add Top Sale');

}else{
    $('#badgeBtn').html('Remove Top Sale');
    
}

}).then(() => {
    $('.loader').css('display', 'none');
})



function editProduct() {

    let updatedProductTitle = document.getElementById('productTitle').value;
    let updatedProductPrice = document.getElementById('productPrice').value;
    let updatedDeliveryTime = document.getElementById('deliveryTime').value;
    let updatedDescription = document.getElementById('description').value;
    let imgUrl = document.getElementById('imgUrl').value;


    if (updatedProductTitle == "" || updatedProductPrice == "" || updatedDeliveryTime == "" || updatedDescription == "" || imgUrl == "") {

    } else {

        if (file == null) {
            $('#editBtn').html('Please Wait....');
            db.collection('product').doc(myParam).update({
                productTitle: updatedProductTitle,
                productPrice: updatedProductPrice,
                deliveryTime: updatedDeliveryTime,
                description: updatedDescription,
                productImage: imgUrl,
            }).then(() => {
                window.location.reload();
            })


        } else {

            var storageRef = firebase.storage().ref('images/productimage' + Date.now());

            var uploadTask = storageRef.put(file);
            $('#editBtn').html('Please Wait....');

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    $('#progressBar').html(`Uploaded ${progress}%`);
                    console.log('Upload is ' + progress + '% done');
                    console.log(snapshot.state)
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        let prodRef = db.collection("product").doc(myParam);

                        let data = {

                            productTitle: updatedProductTitle,
                            productPrice: updatedProductPrice,
                            deliveryTime: updatedDeliveryTime,
                            description: updatedDescription,
                            productImage: downloadURL,


                        }

                        prodRef.update(data).then(() => {
                            window.location.reload();
                        }).catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;

                            console.log(errorMessage);
                            window.alert(errorMessage)
                        });
                    })
                })
        }

    }
}




function topSale(){
    
    db.collection('product').doc(myParam).update({
        topSale: !topSaleBool
    }).then(() => {
        window.location.reload();
    })

}



function deleteProduct(){
    db.collection('product').doc(myParam).delete().then(() => {
        window.alert('Product deleted successfully');
        window.location.href = `${url}products.html`
    })
}