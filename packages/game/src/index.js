import('../pkg')
    .then((pkg) => {
        console.log(pkg);
        window.pkg = pkg;
    })
    .catch(console.error);
