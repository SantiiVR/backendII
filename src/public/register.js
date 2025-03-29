const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key)=>obj [key]=value)
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{'Content-Type':'application/json'}
    }).then(result=> {
        if (result.status===201){
            result.json()
            alert("usuario creado con exito")
            window.location.replace('/user/login')
        }else {
            alert ("no se pudo crear el usuario")
        }
    }).then(json=>console.log(json))
})