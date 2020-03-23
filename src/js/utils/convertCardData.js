const convertCardData = (data, search) => {
  return (({
    title,
    description: text,
    urlToImage: image,
    publishedAt: date,
    url: link,
  }) => ({
    title,
    text,
    image,
    date,
    link,
    keyword: `${search.input[0].toUpperCase()}${search.input.substr(1)}`,
    source: data.source.name,
  }))(data);
};

export default convertCardData;
