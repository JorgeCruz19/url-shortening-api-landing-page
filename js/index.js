const input = document.getElementById('input'),
      btnSubmit = document.getElementById('btn-submit'),
      containerShortUrl = document.getElementById('content-short-url'),
      errorMessage = document.querySelector('.error'),
      loaderElement = document.querySelector('.lds-ellipsis'),
      btnMenu = document.getElementById('btn-menu'),
      menu = document.getElementById('menu');

      loaderElement.classList.add('is-hide')
const handleSubmit = async e => {
    e.preventDefault();
    if (input.value == "") {
        errorMessage.style.display = 'block';
        input.classList.add('is-invalid')
        return false;
    }
    else{
        errorMessage.style.display = 'none';
        input.classList.remove('is-invalid')
    }
    loader(true);
    const value = input.value;
    const shortUrl = await fetchApiShortUrlConverted(value);
    drawShortUrl(shortUrl);
    loader(false);
}

const fetchApiShortUrlConverted = async url => {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        const data = await res.json();
        console.log(res)
        // if (!res.ok) throw { status: res.status, statusText: res.statusText };
        return data;
    } catch (error) {
        // console.log(error, "Hola error", err.statusText || "Ocurrió un error")
    }
}

const drawShortUrl = shortUrl => {
    const { full_short_link, original_link } = shortUrl.result;
    let template = `
        <div class="grid-short-url">
            <div class="grid-short-url-item bg-white">
                <a href="${original_link}" target='_blank'>${original_link}</a>
                <hr>
                <a href="${full_short_link}" target='_blank'>${full_short_link}</a>
                <button class="btn btn-primary w-100 border-radius-small btn-copy">Copy</button>
            </div>
        </div>
    `
    containerShortUrl.innerHTML += template;
    const button = document.querySelector('.btn-copy')
    button.addEventListener('click', () => {
        copyShortUrl(full_short_link);
        button.textContent = "Copied!"
        button.style.backgroundColor = 'hsl(257, 27%, 26%)';
    });
}
/* TODO:
        1- Implementar loader para la peticion a la API 👍
        2- Mejorar tamaño de fuente en dispositivos Tablet👍
        3- La ilustracion debe quedar a la derecha - probar con left o ponerla como fondo el contenedor.
*/

const loader = (flag = false) => {
    if (flag) {
        loaderElement.classList.remove('is-hide');
        loaderElement.classList.add('is-show');
    }
    else{
        loaderElement.classList.remove('is-show');
        loaderElement.classList.add('is-hide');
    }
}
const copyShortUrl = (text) => {
    let classIncrease = 0;
    const textArea = document.createElement('textarea');

    textArea.id = classIncrease++;
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.querySelector("body").appendChild(textArea);
    textArea.value = text;
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.log('Error', + err);
    }
}
btnSubmit.addEventListener('click', handleSubmit)
btnMenu.addEventListener('click', () => {
    menu.classList.toggle('is-show');
})