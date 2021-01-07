createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption (item){
        const imgSrc = item.Poster === 'N/A' ? '' : item.Poster; 
        return `
        <img src = "${imgSrc}"\>
        ${item.Title} ${item.Year}`

    },
    onOptionSelect(item){
        onMovieSelect(item);
        },
    inputValue(item){
        return item.Title;
    },
    //func fetchs api and try catches response
    async fetchData  (searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
        params: {
                apikey: '1d321c',
                s: searchTerm
            }
         });

        if(response.data.Error){
             return [];
         }    
    return response.data.Search;
    }
});

//Helper function for onInput to display movie info after dropdown select
const onMovieSelect = async item => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
                apikey: '1d321c',
                i: item.imdbID
             }
         });
        document.querySelector('#summary').innerHTML = movieTemplate(response.data);
    };


//Helper function for onMovieSelect
const movieTemplate = (itemDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${itemDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content" >
                <div class="content">
                    <h1>${itemDetail.Title}</h1>
                    <h4>${itemDetail.Genre}</h4>
                    <p>${itemDetail.Plot}</p>
                </div>
            </div>
          
        </article>
        <article class="notification is-primary">
            <p class="title">${itemDetail.Awards}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${itemDetail.BoxOffice}</p>
            <p class="subtitle">Awards</p>
        </article> 
        <article class="notification is-primary">
            <p class="title">${itemDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article> 
        <article class="notification is-primary">
            <p class="title">${itemDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article> 
        <article class="notification is-primary">
            <p class="title">${itemDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article> 
    `;

};
