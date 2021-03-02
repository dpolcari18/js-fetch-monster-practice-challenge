const MONST_URL = 'http://localhost:3000/monsters/'


document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    
    function renderMonster(monster) {
        
        let monsterDiv = document.createElement('div')
        
        let monsterName = document.createElement('h2')
        monsterName.innerText = monster.name + monster.id
        
        let monsterAge = document.createElement('h4')
        monsterAge.innerText = `Age: ${monster.age}`
        
        let monsterDescription = document.createElement('p')
        monsterDescription.innerText = `Bio: ${monster.description}`
        
        monsterDiv.append(monsterName, monsterAge, monsterDescription)
        
        monsterContainer.appendChild(monsterDiv)
    }
    
    function renderForm() {
        const formDiv = document.getElementById('create-monster')
        
        let monForm = document.createElement('form')
        
        let nameInput = document.createElement('input')
        nameInput.name = 'name'
        nameInput.placeholder = 'name...'
        
        let ageInput = document.createElement('input')
        ageInput.name = 'age'
        ageInput.placeholder = 'age...'
        
        let descInput = document.createElement('input')
        descInput.name = 'description'
        descInput.placeholder = 'description...'
        
        let submitBtn = document.createElement('button')
        submitBtn.innerText = 'Create'
        
        monForm.addEventListener('submit', (e) => {
            e.preventDefault()
            
            let object = {
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value
            }
            
            fetch(MONST_URL, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                body: JSON.stringify(object)
            }).then(res => res.json()).then(resMon => {
                renderMonster(resMon)
                monForm.reset()
            })
        })
        
        monForm.append(nameInput, ageInput, descInput, submitBtn)
        
        formDiv.appendChild(monForm)        
    }
    
    renderForm()

    let page = 1 
    let currentPage = `?_limit=500&_page=${page}`
    
    const nextBtn = document.getElementById('forward')
    nextBtn.addEventListener('click', () => {
        
        monsterContainer.innerHTML = ''
        ++page 
        currentPage = `?_limit=500&_page=${page}`
        
        fetch(MONST_URL+currentPage)
            .then(res => res.json())
            .then((monRes) => {
                monRes.forEach(monster => renderMonster(monster))
            })
    })
    
    const backBtn = document.getElementById('back')
        backBtn.addEventListener('click', () => {
            if (page === 1) { return }  else {
    
                monsterContainer.innerHTML = ''
                --page
                currentPage = `?_limit=500&_page=${page}`

                fetch(MONST_URL+currentPage)
                    .then(res => res.json())
                    .then((monRes) => {
                        monRes.forEach(monster => renderMonster(monster))
                    })
                }
        })
    
    fetch(MONST_URL+currentPage)
        .then(res => res.json())
        .then((monRes) => monRes.forEach(monster => renderMonster(monster)))
})