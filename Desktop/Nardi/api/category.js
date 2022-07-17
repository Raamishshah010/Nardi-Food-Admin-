var fileButton = document.getElementById('categoryImage');

let file = null;



fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];

});


db.collection('category').get().then((data) => {
    data.forEach((categoryData) => {


        $('#complainTable').append(`

        <tr>
                    
        <td><img src="${categoryData.data().categoryImage}" /></td>
        <td>${categoryData.data().categoryTitle}</td>
        
        <td><a href="/edit-category.html?id=${categoryData.data().categoryId}" class="btn btn-primary"> View </a></td>
        
        </tr>

        
        `)
    })
}).then(() => {
    $('.loader').css('display', 'none');
})


// $('.loader').css('display', 'none');


function addCategory() {

    let categoryTitle = document.getElementById('categoryTitle').value;

    if (categoryTitle == '' || file == null) {
        window.alert('Please Fill All Fields')
    } else {


        var storageRef = firebase.storage().ref('images/categoryimage' + Date.now());

        var uploadTask = storageRef.put(file);
        $('#subBtn').html('Please Wait....');

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

                    let categoryRef = db.collection("category").doc();

                    let data = {

                        categoryTitle,
                        categoryId: categoryRef.id,
                        categoryImage: downloadURL


                    }

                    categoryRef.set(data).then(() => {
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