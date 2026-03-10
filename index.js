
window.addEventListener("load", async function(){

    
    const target = document.querySelector('#result');
    document.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault();

    const results = document.querySelector('#results-container');
    const url = 'https://api.vam.ac.uk/v2/objects/search?q=';

    const searchterm = document.querySelector('#input-search').value.trim();
    const searchquery = url + encodeURIComponent(searchterm);

    const response = await fetch(searchquery);

        // clears results first
        results.innerHTML = '';
        target.textContent = `Loading`;

          try {
            const response = await fetch(searchquery);
            const data = await response.json(url);
   
    
    for (const item of data.records) {

    const imageUrl = item._images._primary_thumbnail;
    const titleText = item._primaryTitle;
    const descriptionText = item._briefDescription;
    const dateText = item._primaryDate;
    const makerText = item._primaryMaker;

    const img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', titleText);

    img.addEventListener('error', function(e) {
    
  });

  const title = document.createElement('h2');
  title.TextContent = titleText;

  const maker = document.createElement('p');
  maker.textContent = makerText;

  const date = document.createElement('p');
  date.textContent = dateText;

  const description = document.createElement('p');
  description.textContent = descriptionText;


  const wrapper = document.createElement('div');
  wrapper.append(img, title, maker, data, description);
  results.append(wrapper);

      
    }


  } catch (error) {
    console.log(error); 
    target.textContent = 'Something went wrong.';
  }
})})