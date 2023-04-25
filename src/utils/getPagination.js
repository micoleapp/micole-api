const getPagination = (url, page, limit, total) => {
  // limit-> numero de items por pagina, page -> numero de pag solicitada por el usuario
  const prevPage = page > 1 ? ((parseInt(page, 0)) - 1) : 1;
  const lastPage = Math.ceil(total / limit); // numero de páginas
  const nextPage = limit * page < total ? (parseInt(page, 0) + 1) : lastPage;
  const links = {
    first: `${url}${url.endsWith("&") ? "" : ""}limit=${limit}&page=1`,
    prev: `${url}${url.endsWith("&") ? "" : ""}limit=${limit}&page=${prevPage}`,
    next: `${url}${url.endsWith("&") ? "" : ""}limit=${limit}&page=${nextPage}`,
    last: `${url}${url.endsWith("&") ? "" : ""}limit=${limit}&page=${lastPage}`,
  };

  return links;
};

module.exports = getPagination;