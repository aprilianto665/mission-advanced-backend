const buildWhereClause = (filter, search) => {
  if (!filter || !search) return {};

  const validFields = ["title", "category", "genre", "cast", "creators"];

  if (!validFields.includes(filter)) {
    return { id: -1 };
  }

  if (["genre", "cast", "creators"].includes(filter)) {
    return {
      [filter]: {
        path: "$",
        string_contains: search,
        mode: "insensitive",
      },
    };
  }

  if (["title"].includes(filter)) {
    return {
      [filter]: {
        contains: search,
      },
    };
  }

  if (["category"].includes(filter)) {
    return {
      [filter]: {
        equals: search.toUpperCase(),
      },
    };
  }
};

const buildOrderBy = (orderBy, sortOrder) => {
  const validFields = [
    "id",
    "title",
    "category",
    "duration",
    "releaseYear",
    "ageRating",
    "rating",
  ];
  const validSortOrders = ["asc", "desc"];
  
  if (orderBy && !validFields.includes(orderBy)) {
    return null;
  }
  
  if (sortOrder && !validSortOrders.includes(sortOrder)) {
    return null;
  }
  
  return validFields.includes(orderBy)
    ? { [orderBy]: sortOrder === "desc" ? "desc" : "asc" }
    : { id: "asc" };
};

module.exports = {
  buildWhereClause,
  buildOrderBy,
};
