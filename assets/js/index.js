var firstLoad = true

document.addEventListener("DOMContentLoaded", () => {
    checkPath(true);
    window.addEventListener("popstate", (e) => {
        checkPath(false)
    });
});

const checkPath = async (create) => {
    let pathName = window.location.pathname;
    if (pathName == "/") {
        await createPage('pageOne' , "js/jsOne.js" , '/' , create)
    } else if (pathName == "/PROFILE") {
        await createPage('pageTwo' , "js/jsTwo.js" , '/PROFILE' , create)
    }
};

const createPage = async (path , srcScript , url , type) => {
    let host = window.location.host;
    await fetch("http://" + host + "/changePage" , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            page:path,
            password:'123456'
        })
    }).then(e => e.text()).then(html => {
        let s = document.createElement('script')
        document.getElementById("scriptOfPage").remove()
        s.src = srcScript
        s.id = "scriptOfPage"
        document.body.innerHTML = html;
        document.body.appendChild(s)
    });

    if(type) {
        if(!firstLoad){
            if(window.history.state != null) {
                if(window.history.state['page'] != url) window.history.pushState({page:url} , path , url)
            } else 
                window.history.pushState({page:url} , path , url)
        } else firstLoad = false
    }
};