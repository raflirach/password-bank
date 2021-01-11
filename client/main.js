const baseUrl = "http://localhost:3001"

$(document).ready(function(){
  cekAuth()
})

$('button').click(function(event){
  event.preventDefault()
})

function cekAuth(){
  if(localStorage.access_token){
    $('#form-login').hide()
    $('#pass-container').show()
    $('#form-create').hide()
    $('#btn-add').show()
    $('#btn-logout').show()
    getPasswords()
  }else{
    $('#form-login').show()
    $('#form-create').hide()
    $('#pass-container').hide()
    $('#btn-add').hide()
    $('#btn-logout').hide()
  }
}

function login(){
  const email = $('#emailLogin').val()
  const password = $('#passLogin').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(res => {
    localStorage.access_token = res.access_token
    cekAuth()
    $('#emailLogin').val('')
    $('#passLogin').val('')
  })
  .fail(err => {
    console.log(err);
  })
}

function getPasswords(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/passwords`,
    headers : {
      access_token: localStorage.access_token
    }
  })
  .done(res => {
    console.log(res);
    $("#pass-content").empty()
    res.forEach(e => {
      $("#pass-content").append(`
    <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <h5 class="card-title">${e.name}</h5>
        <p class="card-text">${e.url}</p>
        <p class="card-text">${e.username}</p>
        <p class="card-text">${e.password}</p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
          <div class="btn-group mx-auto">
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              onclick="deletePass(${e.id})"
            >
              Delete Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `)
    })
  })
  .fail(err => {
    console.log(err);
  })
}

function deletePass(id){
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/passwords/${id}`,
    headers : {
      access_token: localStorage.access_token
    }
  })
  .done(res => {
    getPasswords()
  })
  .fail(err => {
    console.log(err);
  })
}

function addPass(){
  $('#form-create').show()
  $('#pass-container').hide()
}

function addToPass(){
  const name = $('#name').val()
  const url = $('#url').val()
  const username = $('#username').val()
  const password = $('#password').val()

  console.log(name, url, username, password);

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/passwords`,
    headers : {
      access_token: localStorage.access_token
    },
    data: {
      name,
      url,
      username,
      password
    }
  })
  .done(res=> {
    getPasswords()
    $('#form-create').hide()
    $('#pass-container').show()
  })
  .fail(err => console.log(err))
}

function logout(){
  localStorage.clear()
  cekAuth()
}