function toggleMode() {
  halfmoon.toggleDarkMode()
  if (document.body.classList.contains("bg-light")) {
    document.body.classList.remove("bg-light")
  } else {
    document.body.classList.add("bg-light")
  }
  
}

axios
  .get("aktiviteter.json", {
    timeout: 5000,
  })
  .then((res) => showOutput(res))
  .catch((err) => console.error(err));
  
  function showOutput(res) {
    const tabell = document.getElementById("aktivitet-tabell")
    const kommentarer = document.getElementById("aktivitet-modals")
    const aktiviteter = Object.values(res.data.aktiviteter)

    let innhold = ""
    let modals = ""

    aktiviteter.forEach((aktivitet, index) => {
      innhold += `
        <tr>
          <td><small class="text-muted">${index +1}</small></td>
          <td>${aktivitet.aktivitet}</td>
      `
      if(aktivitet.kommentar.length > 0) {
        innhold += `<td><button class="btn btn-sm" type="button" data-toggle="modal" data-target="modal-${index + 1}"><i class="fas fa-check text-success"></i></button></td>`
        modals += `
          <div class="modal" id="modal-${index + 1}" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <a href="#" class="close" role="button" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
                <h5 class="modal-title">
                  ${aktivitet.aktivitet}
                </h5>
                <p>
                  ${aktivitet.kommentar}
                </p>
              </div>
            </div>
          </div>
        `
      } else {
        innhold += `<td><button class="btn btn-sm" type="button" disabled="disabled"><i class="fas fa-check text-muted"></i></button></td>`
      } 
      innhold += `</tr>`
    })

    tabell.innerHTML = innhold
    kommentarer.innerHTML = modals

  }

