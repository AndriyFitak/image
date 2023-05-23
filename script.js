const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const showMoreBtn = document.getElementById('showMoreBtn');
const imageGallery = document.getElementById('imageGallery');

let currentPage = 1;
let totalImages = 0;
let currentQuery = '';

searchBtn.addEventListener('click', searchImages);
showMoreBtn.addEventListener('click', showMoreImages);

function searchImages() {
  const query = searchInput.value;
  currentQuery = query;
  const apiKey = '36530893-49c9068c29385794c150723ce'; // Замініть на свій API-ключ з Pixabay

  axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${query}&per_page=10`)
    .then(response => {
      totalImages = response.data.totalHits;
      currentPage = 1;
      showImages(response.data.hits);
      updateShowMoreButton();
    })
    .catch(error => {
      console.log(error);
    });
}

function showImages(images) {
  imageGallery.innerHTML = '';

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image');
    imageContainer.appendChild(imgElement);

    imageContainer.addEventListener('click', () => {
      openImageDetails(image);
    });

    imageGallery.appendChild(imageContainer);
  });
}

function openImageDetails(image) {
  const newPage = window.open('', '_blank');
  newPage.document.write(`
    <html>
    <head>
      <title>Image Details</title>
      <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
      <div class="image-details">
        <img class="img-det" src="${image.webformatURL}" alt="${image.tags}">
        <div class="details">
          <p>Завантажень: ${image.downloads}</p>
          <p>Лайків: ${image.likes}</p>
          <p>Переглядів: ${image.views}</p>
        </div>
      </div>
    </body>
    </html>
  `);
}

function showMoreImages() {
  const apiKey = '36530893-49c9068c29385794c150723ce'; // Замініть на свій API-ключ з Pixabay

  axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${currentQuery}&per_page=10&page=${currentPage + 1}`)
    .then(response => {
      currentPage += 1;
      showImages(response.data.hits);
      updateShowMoreButton();
    })
    .catch(error => {
      console.log(error);
    });
}

function updateShowMoreButton() {
  if ((currentPage * 10) < totalImages) {
    showMoreBtn.style.display = 'block';
  } else {
    showMoreBtn.style.display = 'none';
  }
}
