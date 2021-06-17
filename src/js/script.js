
const arrays = {
  favoriteBooks: [],
  filters: [],
};

const domSelectors = {
  booksList: document.querySelector('.books-list'),
  filterForm: document.querySelector('.filters'),
};

class BooksList {
  constructor(data){
    const thisBookList = this;
    const books = data;

    thisBookList.render(books);
    thisBookList.initActions(books);
  }

  render(books){
    const thisBookList = this;
    const listTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);


    for(const book of books){
      const generatedHTML = listTemplate(book);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      domSelectors.booksList.appendChild(bookElement);
      thisBookList.renderRating(book);
    }
  }

  renderRating(book){
    const filler = document.querySelector('.rating-' + book.id + '');
    const width = (book.rating * 10) + '%';
    const rating = book.rating;
    filler.style.width = width;

    switch (true) {
    case (rating < 6): filler.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      break;
    case (rating <= 8): filler.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      break;
    case (rating <= 9): filler.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      break;
    case (rating > 9): filler.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      break;
    }
  }

  initActions(books){
    const thisBookList = this;

    domSelectors.booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      thisBookList.addFavorite(event);
    });
    domSelectors.filterForm.addEventListener('click', function(event){
      const element = event.target;

      if(element.name === 'filter'){
        if(element.checked){
          arrays.filters.push(element.value);
        }else{
          arrays.filters.splice(arrays.filters.indexOf(element.value), 1);
        }
      }
      thisBookList.filterBooks(books);

    });
  }

  filterBooks(books){

    for(const book of books){
      const genre = book.details;
      const idImg = document.querySelector('a[data-id="' + book.id + '"]');
      idImg.classList.add('hidden');

      for(const genreType in genre){
        const hasGenre = genre[genreType];

        if(arrays.filters.includes(genreType) && hasGenre || !arrays.filters.length){
          idImg.classList.remove('hidden');
        }
      }
    }
  }

  addFavorite(elem){
    const element = elem.target.parentNode;
    if(element.parentNode.classList.contains('book__image')){
      const id = element.parentNode.getAttribute('data-id');
      if(arrays.favoriteBooks.includes(id)){
        arrays.favoriteBooks.splice(arrays.favoriteBooks.indexOf(id), 1);
        element.parentNode.classList.remove('favorite');
      }else{
        element.parentNode.classList.add('favorite');
        arrays.favoriteBooks.push(id);
      }
    }
  }
}

const app = new BooksList(dataSource.books);
