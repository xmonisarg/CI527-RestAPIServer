
window.addEventListener("load", async function(){

    const target = document.querySelector('#result');

    document.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault();


    // fetches results from the URL to show in the results container 
    const results = document.querySelector('#results-container');
    const url = 'https://api.vam.ac.uk/v2/objects/search?q=';

    const searchterm = document.querySelector('#input-search').value.trim();
    const searchquery = url + encodeURIComponent(searchterm);

        // Clears results first while it fetches the new information from the query
        results.innerHTML = '';
        target.textContent = `Loading`;

          try {
            const response = await fetch(searchquery);
            const data = await response.json();
   
    
    for (const item of data.records) {

    
// fetches the system number to get all of the information
    const detailURL = 'https://api.vam.ac.uk/v2/object/' + item.systemNumber;
    const detailRes = await fetch(detailURL);
    const detailData = await detailRes.json();

    const imageUrl = item._images._primary_thumbnail;
    const titleText = item._primaryTitle;
    const descriptionText = detailData.record.physicalDescription;
    const dateText = item._primaryDate;
    const makerText = item._primaryMaker.name;

    const img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', titleText);

    // If an item does not have an image it will display a no image holder
    img.addEventListener('error', function(e) {
      img.setAttribute('src','https://placehold.co/100x100?text=No+Image');
    
  });
// Creating all the elements to show all the information needed
  const itemtitle = document.createElement('h3');
  itemtitle.textContent = titleText;

  const itemmaker = document.createElement('p');
  itemmaker.textContent = makerText;

  const itemdate = document.createElement('p');
  itemdate.textContent = dateText;

  const itemdesc = document.createElement('p');
  itemdesc.textContent = descriptionText;

  // displays the image, title, maker, date and descreiption in a div element
  const wrapper = document.createElement('div');
  wrapper.append(img, itemtitle, itemmaker, itemdate, itemdesc);
  results.append(wrapper);

      
    }


  } catch (error) {
    console.log(error); 
    target.textContent = 'Something went wrong.';
  }
})})