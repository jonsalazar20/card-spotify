const url = 'https://api.spotify.com/v1/users/j6t0g891qkz240xsl5nyb7jnd'
const urlToken = 'https://accounts.spotify.com/api/token'

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials')
data.append('client_id', 'f6679de2c37b4ac6b3873443f2ba259c')
data.append('client_secret', '46493c7c165d487e879fa1e99846def4')

const getToken = (data) => {
    fetch(urlToken, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(data => {
            const { access_token } = data
            getDatas(access_token)
        })
        .catch(err => console.error(err))
}
getToken(data)

const getDatas = (token) => {
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            getName(data);
            changeImage(data);
            getProfileUrl(data)
        })
        .catch(error => console.error(error))
}



const changeImage = (data) => {
    const { images } = data
    for (let i = 0; i < images.length; i++) {
        let userDisplay = images[i].url
        document.getElementById('userImg').src = userDisplay
    }
}

const getName = (data) => {
    let name = ''
    const { display_name } = data
    let useName = document.getElementById('user');
    useName.innerHTML = display_name
    useName = name

    
}

const getProfileUrl = (data) => {
    const { external_urls } = data
    const urlProfile = external_urls.spotify
    document.getElementById('profile').setAttribute("href",urlProfile)
}





