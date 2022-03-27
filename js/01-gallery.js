import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery')
let modal = basicLightbox.create('')

galleryRef.innerHTML = createGalleryMarkup(galleryItems);
galleryRef.addEventListener('click', onGalleryItemClick);

function createGalleryMarkup(galleryArr) {
    return galleryArr.map(({description, original, preview}) => {
        return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`
    }).join('')
}

function onGalleryItemClick(evt) {
    evt.preventDefault()

    if (evt.target.nodeName !== 'IMG') {
        return
    }

    const imageUrl = evt.target.dataset.source

    openModal(imageUrl)
}

function onEscPress(evt) {
    if (evt.key !== 'Escape') {
        return
    }
    closeModal() 
}

function openModal(url) {
    modal = basicLightbox.create(`
    <img src="${url}">
`)
    
    modal.show(() => {
        window.addEventListener('keydown', onEscPress);
    })
}

function closeModal() {
    modal.close(() => {
        window.removeEventListener('keydown', onEscPress);
    })
}


