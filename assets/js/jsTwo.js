document.querySelector('#topage1').addEventListener('click' , async ()=>{
    await createPage('pageOne' , "jsOne" , true , '#body')
})