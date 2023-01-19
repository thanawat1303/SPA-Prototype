document.querySelector('h1').addEventListener('click' , async ()=>{
    await createPage('pageOne' , "js/jsOne.js" , '/' , true)
})