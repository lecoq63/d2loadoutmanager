const clientId = '47225';
const redirectUri = 'https://lecoq63.github.io/d2loadoutmanager/';
const apiKey = '6be52acbd23c41ac8fb70fe25330a353';

document.getElementById('login-button').addEventListener('click', () => {
    const authUrl = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
});

async function fetchLoadouts(token) {
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/Actions/Loadouts/SnapshotLoadout/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-API-KEY': apiKey
        }
    });
    const data = await response.json();
    return data;
}

async function displayLoadouts() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        const tokenResponse = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: '8eYAlgCm18agu8vXXlS3W73vFmSni8FL1sqQ2xYP.BY',
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            })
        });
        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;
        const loadouts = await fetchLoadouts(token);
        document.getElementById('loadouts').innerText = JSON.stringify(loadouts, null, 2);
    }
}

displayLoadouts();
