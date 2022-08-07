
let catId= '';
var fileButton = document.getElementById('productImage');


fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];

});


db.collection('category').get().then((data) =>{
    let i= 0;
    data.forEach((categoryData) =>{
        

        $('#categories').append(`

        <li style="padding:10px;" ><a class="dropdown-item" id="cat${i}">${categoryData.data().categoryTitle}</a></li>
        
        `)

        $(`#cat${i}`).on('click' , () =>{
            catId = categoryData.data().categoryId;
            
            $('#dropdownMenuButton1').html(categoryData.data().categoryTitle)

        })

        i++
    })
})




function addProduct(){

    let productTitle = document.getElementById('productTitle').value;
    let productPrice = document.getElementById('productPrice').value;
    let deliveryTime = document.getElementById('deliveryTime').value;
    let description = document.getElementById('description').value;

    if (productTitle == "" || productPrice == "" || description == "" || deliveryTime == "" || catId == "" || file == null) {
        window.alert('Please Enter All Fields')
    }else{




        var storageRef = firebase.storage().ref('images/productImage' + Date.now());
    
        var uploadTask = storageRef.put(file);
        $('#addProductBtn').html('Please Wait....');
    
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
    
                    let prodRef = db.collection("product").doc();
    
                    let data = {
                        productTitle,
                        productPrice,
                        deliveryTime,
                        description,
                        topSale: false,
                        weeklyPlan: false,
                        categoryId: catId,
                        productImage: downloadURL,
                        productId: prodRef.id

                        
                        
                    }
    
                    prodRef.set(data).then(() => {
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


db.collection("product").get().then((data) => {

    data.forEach((productData) => {
        

        let product = productData.data();

        let description = product.description.slice(0, 21);

        $("#productTable").append(`
        
        <tr>
                    
                    <td><img src="${product.productImage}" style="height: 60px; width: 60px; border-radius: 50% " /></td>
                    <td>${product.productTitle}</td>
                    <td>${description}</td>
                    <td>${product.deliveryTime} Mins</td>
                    <td><a href="${url}edit-product.html?id=${product.productId}" class="btn btn-primary">View</a></td>
                    
                    
        </tr>
        
        `)
    })

}).then(() => {
    $('.loader').css('display', 'none');
})
