const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    root.innerHTML = `
        <label><b>Search<b/></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <dive class="dropdown-content results"></div>
            </div>    
        </div>    
    `;
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')
    
    //function displays drop down menu
    const onInput = async event => {
        const items = await fetchData(event.target.value);
    
        if(!items.length){
            dropdown.classList.remove('is-active');
        }
        
        resultsWrapper.innerHTML = "";
        dropdown.classList.add('is-active');
        document.querySelector('.tutorial').classList.add('is-hidden')
    
        for(let item of items){
            const option = document.createElement('a')
            
            
            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item);
            option.addEventListener('click', event =>{
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            })
    
            resultsWrapper.appendChild(option)
    
        }

        
        

    }
        
    input.addEventListener('input', debounce(onInput, 1000));
    // closes dropdown when clicking outside of drop down
    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
        
    })
    
    
};