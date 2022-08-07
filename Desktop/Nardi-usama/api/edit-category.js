let urlPram = new URLSearchParams(window.location.search);

let myParam = urlPram.get('id');

let file = null;

var fileButton = document.getElementById('categoryImage');

fileButton.addEventListener('change', function (e) {

    file = e.target.files[0];

});


db.collection('category').doc(myParam).get().then((categoryData) => {

    $('#categoryTitle').val(categoryData.data().categoryTitle);
    $('#imgUrl').val(categoryData.data().categoryImage);



}).then(() => {
    
$('.loader').css('display', 'none')
})


function editCategory() {

    let updatedCatTitle = $('#categoryTitle').val();
    let updatedUrlImage = $('#imgUrl').val()

    if (updatedCatTitle == "" || updatedUrlImage =="" ) {
        window.alert("Please Fill All Fields")
    }else{

        if (file == null) {
            $('#editBtn').html('Please Wait....');

            db.collection('category').doc(myParam).update({
                categoryTitle: updatedCatTitle,
                categoryImage : updatedUrlImage
            }).then(() => {
                window.location.reload();
            })

        }else{
            $('#editBtn').html('Please Wait....');


            var storageRef = firebase.storage().ref('images/categoryimage' + Date.now());

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

                        db.collection('category').doc(myParam).update({
                            categoryTitle: updatedCatTitle,
                            categoryImage : downloadURL
                        }).then(() => {
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

function deleteCategory(){
    db.collection('category').doc(myParam).delete().then(() =>{
        window.alert('Deleted Successfully');
        window.location.href = `${url}categories.html`
    })
}


