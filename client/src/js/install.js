const butInstall = document.getElementById('buttonInstall');
let deferredPrompt
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()

    deferredPrompt = event

    console.log('beforeinstallprompt fired')
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt()

    const {output} = await deferredPrompt.prompt()

    console.log(`${output}`)

    deferredPrompt = null
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null
    console.log('PWA installed')
});
