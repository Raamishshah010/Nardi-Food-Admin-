db.collection('userCollection').get().then((data) => {

    $('#usersCount').html(data.docs.length);
    let i = 0;
    data.forEach((userData) => {

        let user = userData.data();

        $('#usersTable').append(`
        
        <tr>
                    
        <td id="usersImg${i}"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.contactNo}</td>
        <td>${user.address}</td>
        <td>${user.registerYear}</td>
        
        
    </tr>

    
        `);
        console.log(user.image);
        if (user.image == null) {
            $(`#usersImg${i}`).append(`
            <img src="https://i.ibb.co/2vXQ7j2/Png-Item-307416.png" style="height: 40px; width: 40px" />
            `)

            
        }else{
        

            $(`#usersImg${i}`).append(`
            <img src="${user.image}" style="height: 40px; width: 40px" />
            `)
        }

        i++;


    })
}).then(() => {
    $('.loader').css('display', 'none')
})