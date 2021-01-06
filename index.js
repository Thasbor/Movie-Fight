//func fetchs api and try catches response
const fetchData = async (searchTerm) => {
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
};

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search For a Movie<b/></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <dive class="dropdown-content results"></div>
        </div>    
    </div>    
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown')
const resultswrapper = document.querySelector('.results')


const onInput = async event => {
    const movies = await fetchData(event.target.value);
    

    for(let movie of movies){
        const option = document.createElement('a')

        dropdown.classList.add('is-active');
        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src = "${movie.Poster}"\>
        ${movie.Title}
        `;

        resultswrapper.appendChild(option)

    }
}
    
input.addEventListener('input', debounce(onInput, 1000));

fetchData();
