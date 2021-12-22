exports.getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (items, page, limit) => {
  const { count: total, rows: data } = items;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);

  return { total, data, totalPages, currentPage };
};