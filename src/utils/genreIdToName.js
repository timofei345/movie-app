export const genreIdToName = (ids, list) => {
    const result = ids.map(id => {
      const foundElement = list.find(element => element.id === id);
      return foundElement ? foundElement : "fck";
    });
  
    return result;
  };