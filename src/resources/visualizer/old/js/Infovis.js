class Infovis {
  presentData(data) {
    const div = document.createElement('div');

    div.innerHTML = JSON.stringify(data);
    document.body.appendChild(div);
  }
}
