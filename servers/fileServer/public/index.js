const button = document.querySelector('button');
const img = document.querySelector('img');

button.addEventListener('click', () => {
  if (img.classList.contains('showImage')) {
    img.classList.remove('showImage');
  } else {
    img.classList.add('showImage');
  }
});
