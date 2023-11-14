const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPictureContainer = document.querySelector('.big-picture');
const commentList = bigPictureContainer.querySelector('.social__comments');
//const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
//const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  const commentFragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    commentFragment.append(comment);
  });

  commentList.append(commentFragment);
};

export { renderComments };

