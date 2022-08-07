
let adminUid = localStorage.getItem('adminUid')

console.log(adminUid);

if(adminUid == null) {
    window.location.href = `${url}/login.html`
}
