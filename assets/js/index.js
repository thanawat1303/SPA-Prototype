let firstLoad = true
const pathJS = "assets/js"

document.addEventListener("DOMContentLoaded", () => {
    checkPath();
    window.addEventListener("popstate", (e) => {
        checkPath(false)
    });
});

const checkPath = async ({create = true}) => {
    let pathName = window.location.pathname;
    if (pathName == "/") {
        await createPage('pageOne' , "jsOne" , create)
    } else if (pathName == "/PROFILE") {
        await createPage('pageTwo' , "jsTwo" , 'PROFILE' , create)
    }
};

const createPage = async (path , srcScript , {url = ""} , type) => {
    // paramitor
    let host = window.location.host;
    await fetch("http://" + host + "/changePage" , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            page:path,
            password:'thanawat1303'
        })
    }).then(e => e.text()).then(html => {
        let s = document.createElement('script')
        document.getElementById("scriptOfPage").remove()
        s.src = pathJS+srcScript+"js"
        s.id = "scriptOfPage"
        document.body.innerHTML = html;
        document.body.appendChild(s)
    });

    if(type) {
        if(!firstLoad){
            if(window.history.state != null) {
                if(window.history.state['page'] != "/"+url) window.history.pushState({page:"/"+url} , path , "/"+url)
            } else 
                window.history.pushState({page:"/"+url} , path , "/"+url)
        } else firstLoad = false
    }
};

