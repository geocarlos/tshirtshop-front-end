const slugify = (str) => {
    return str.replace(/\W+/g, '-').toLowerCase();
}

const setPages = (itemArray, itemsPerPage) => {
    const count = itemArray.length;
    const pageCount = count % 10 === 0 ? count / itemsPerPage : count / itemsPerPage + 1;
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(itemArray.slice(i, i + itemsPerPage));
    }
   
    return pages;
}

const getQueries = () =>{
    
    const queryPart = window.location.href.split('?')[1];
    const queries = [];
    const queriesObject = {};

    if(queryPart && queryPart.includes('&')){
        queries.concat(queryPart.split('&'));
    } else if (queryPart && queryPart.includes('=')) {
        queries.push(queryPart);
    }

    for(const query of queries){
        const keyValue = query.split('=')
        queriesObject[keyValue[0]] = keyValue[1];
    }
    return queriesObject;
}

export { slugify, setPages, getQueries };