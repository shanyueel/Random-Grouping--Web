const indexURL = "https://lighthouse-user-api.herokuapp.com/api/v1/users";

const userData = [];

const userPanel = document.querySelector('#user-panel')
const groupPanel = document.querySelector('#group-panel')
const divideMethodSelector = document.querySelector('#divide-method-selector')
const inputTeam = document.querySelector('#input-team')
const inputMember = document.querySelector('#input-member')


function userCardRender(user) {
  let rawHTML = ""

  user.forEach(item => {
    rawHTML += `<figure class="figure border-2 m-3 user-card">
    <img src="${item.avatar}" class="figure-img img-fluid rounded border-2 m-0 img-thumbnail user-img" alt="user-photo" type="button" data-bs-toggle="modal" data-bs-target="#user-modal" data-id="${item.id}">
    <figcaption class="figure-caption text-center m-1"><span id="user-first-name"><b>${item.name}</b></span><em id="user-region"> ${item.region}</em></figcaption>
  </figure>`
  })

  userPanel.innerHTML = rawHTML

}

function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-title')
  const modalPhoto = document.querySelector('#user-modal-photo')
  const modalRegion = document.querySelector('#user-modal-region')
  const modalGender = document.querySelector('#user-modal-gender')
  const modalAge = document.querySelector('#user-modal-age')
  const modalBirthday = document.querySelector('#user-modal-birthday')
  const modalEmail = document.querySelector('#user-modal-email')

  const modalUpdate = document.querySelector('#user-modal-update')
  const modalCreate = document.querySelector('#user-modal-create')

  axios.get(indexURL + "/" + id)
    .then(response => {
      const data = response.data

      modalTitle.innerHTML = `${data.name} ${data.surname}`
      modalRegion.innerHTML = `<b>region:</b> ${data.region}`
      modalGender.innerHTML = `<b>gender:</b>  ${data.gender}`
      modalAge.innerHTML = `<b>age:</b>  ${data.age} years old`
      modalBirthday.innerHTML = `<b>birthday:</b>  ${data.birthday}`
      modalEmail.innerHTML = `<b>email:</b>  ${data.email}`
      modalPhoto.innerHTML = `<img src="${data.avatar}" alt="user-photo" class="img-fluid img-thumbnail rounded mx-auto d-block">`

      modalUpdate.innerText = `updated at: ${data.updated_at}`
      modalCreate.innerText = `updated at: ${data.created_at}`

    })
}

function divideByTeam(input) {
  let memberPerTeam = Math.floor(userData.length / inputTeam.value)
  let memberLeft = userData.length % inputTeam.value

  const groupList = []

  for (let x = 0; x < input; x++) {

    const teamMember = []

    if (x < memberLeft) {
      for (let i = 0; i < memberPerTeam + 1; i++) {
        let randomUserNum = Math.floor(Math.random() * userData.length)
        teamMember.push(userData[randomUserNum])
        userData.splice(randomUserNum, 1)
      }
    } else {
      for (let i = 0; i < memberPerTeam; i++) {
        let randomUserNum = Math.floor(Math.random() * userData.length)
        teamMember.push(userData[randomUserNum])
        userData.splice(randomUserNum, 1)
      }
    }

    groupList.push(teamMember)
    console.log(groupList)
    console.log(userData)

  }
  localStorage.setItem('groupList', JSON.stringify(groupList))
}

function divideByMember(input) {
  let numberOfTeams = Math.ceil(userData.length / input)

  const groupList = []

  for (let x = 0; x < numberOfTeams; x++) {

    const teamMember = []

    if (userData.length >= Number(input)) {
      for (let i = 0; i < input; i++) {
        let randomUserNum = Math.floor(Math.random() * userData.length)
        teamMember.push(userData[randomUserNum])
        userData.splice(randomUserNum, 1)
      }
    } else {
      teamMember.push(...userData)
    }

    groupList.push(teamMember)
    // console.log(groupList)
    console.log(userData)
  }

  localStorage.setItem('groupList', JSON.stringify(groupList))

}

localStorage.removeItem('groupList')

axios.get(indexURL)
  .then((response) => {
    // User array(200)
    userData.push(...response.data.results)
    userCardRender(userData)
  })
  .catch((error) => console.log(error))


userPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.user-img')) {
    showUserModal(Number(event.target.dataset.id))
  }
})

divideMethodSelector.addEventListener('click', event => {
  const target = event.target

  if (target.classList.contains('team-divide-button')) {
    let memberPerTeam = userData.length / inputTeam.value


    if (!isNaN(inputTeam.value) && inputTeam.value.trim().length > 0) {
      divideByTeam(inputTeam.value)
      window.location.href = "grouplist.html"
    } else {
      alert("Please input a number!")
    }
  }


  if (target.classList.contains('member-divide-button')) {

    if (!isNaN(inputMember.value) && inputMember.value.trim().length > 0) {
      divideByMember(inputMember.value)
      window.location.href = "grouplist.html"
    } else {
      alert("Please input a number!")
    }
  }
})
