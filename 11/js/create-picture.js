const createComments = ({ id, url, message, name}) => ({
  commentId: id,
  avatar: url,
  message: message,
  name: name,
});

const createPicture = ({ id, url, description, likes, comments }) => ({
  id: id,
  url: url,
  description: description,
  likes: likes,
  comments: comments.map(createComments),
});

const getPictures = (count, pictures) => pictures.slice(0, count).map(createPicture);

export { getPictures };
