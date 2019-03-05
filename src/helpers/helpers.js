const slugify = (str) => {
    return str.replace(/\W+/g, '-').toLowerCase();
}

export { slugify };