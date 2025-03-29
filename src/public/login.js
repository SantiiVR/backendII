const form = document.getElementById('loginFomr')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
            .then(json => {
                alert ("login realizado")
            })
            window.location.replace('/users')
        }else if (result.status === 401){
            alert("Credenciales no validas")
        }
    })
})