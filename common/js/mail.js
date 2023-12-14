function serializeForm(formNode) {
    const { elements } = formNode;
    const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element

      return { name, value }
    })
        
    send(data);
}   

function send(data){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mabakainu@gmail.com",
        Password : "77764DA8B0288D692BE30967A1FDCD9B438F",
        To : "pet.tester@yandex.ru",
        From : "mabakainu@gmail.com",        
        Subject : `Обратная связь от ${data[0].value}`,
        Body : `<html>${data[0].value}: ${data[2].value}.Почта: ${data[1].value} </html>`
    }).then(
      message => alert(message)
    );    
}

function handleFormSubmit(event) {
    event.preventDefault();
    serializeForm(form);
}

const form = document.getElementById('form');
form.addEventListener('submit', handleFormSubmit);    