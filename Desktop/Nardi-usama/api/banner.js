
$('.loader').css('display', 'none')


var fileButton = document.getElementById('bannerImage');


fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];

});


let catId = "";






db.collection('banner').get().then((data) => {
    let i = 0;  
    data.forEach((bannerData) => {
        
    

        $('#bannerTable').append(`
        
        <tr>
                    
        <td><img src="${bannerData.data().bannerImage}" style="width: 150px; height: 100px" /></td>
        <td>${bannerData.data().bannerTitle}</td>
        
        <td><button id="deleteCat${i}" class="btn btn-primary"> Delete </button></td>
        
        
    </tr>
        `)

        $(`#deleteCat${i}`).on('click' , () =>{
            
            bannerId = bannerData.data().bannerId;

            db.collection('banner').doc(bannerId).delete().then(() => {
                window.alert('Deleted Successfully!');
                window.location.reload();
            })

        })


        i++

    })
})




db.collection('category').get().then((data) => {
    let i = 0;
    data.forEach((catData) => {
        

        $('#catList').append(`
        <li><a class="dropdown-item" id="catFunction${i}">${catData.data().categoryTitle}</a></li>
        `)

        $(`#catFunction${i}`).on('click' , () =>{
            catId = catData.data().categoryId;

            $('#catDropdown').html(catData.data().categoryTitle)

        })

        i++;

    })
})




function addBanner() {


    let bannerTitle = document.getElementById('bannerTitle').value;

    if (bannerTitle == "" , catId == "") {

        window.alert('Please Fill All Fields')
    }else{

        $('#subBtn').html('Please Wait....');
        $('#subBtn').addClass('disabled');

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
    
                    let bannerRef = db.collection("banner").doc();
    
                    let data = {
                        bannerTitle,
                        bannerImage : downloadURL,
                        bannerId : bannerRef.id,
                        categoryId : catId
                        
                    }
    
                    bannerRef.set(data).then(() => {
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