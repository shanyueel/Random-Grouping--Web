const indexURL = "https://lighthouse-user-api.herokuapp.com/api/v1/users";

const userData = [];
const groupList = JSON.parse(localStorage.getItem('groupList'))

const userPanel = document.querySelector('#user-panel')
const groupPanel = document.querySelector('#group-panel')
const divideMethodSelector = document.querySelector('#divide-method-selector')
const inputTeam = document.querySelector('#input-team')
const inputMember = document.querySelector('#input-member')


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

function groupRender(list) {


  let rawHTML = ""

  for (let i = 0; i < list.length; i++) {
    rawHTML += `<div class="group col-5 border border-2 me-3 my-5">
    <h3 class="text-center m-5">Group ${i + 1}</h3>
    <div class="d-flex flex-wrap justify-content-center">`

    for (let user of list[i]) {
      rawHTML += `
      <figure class="figure border-2 m-3 user-card">
          <img src= ${user.avatar} class="figure-img img-fluid rounded border-2 m-0 img-thumbnail user-img" alt="user-photo" type="button" data-bs-toggle="modal" data-bs-target="#user-modal" data-id= ${user.id} >
            <figcaption class="figure-caption text-center m-1"><span id="user-first-name"><b>${user.name}</b></span><em id="user-region"> ${user.region}</em></figcaption>
      </figure>`
    }

    rawHTML += "</div></div>"

    groupPanel.innerHTML = rawHTML

  }
}

groupRender(groupList)


groupPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.user-img')) {
    showUserModal(Number(event.target.dataset.id))
  }
})