const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');


const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  const COMMENT_COUNT_SHOW = 5;
  const commentsLoader = document.querySelector('.comments-loader');

  commentList.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  let shownCommentsCount = 0;

  const onCommentsLoaderClick = () => {
    const commentsToRender = comments.slice(shownCommentsCount, shownCommentsCount + COMMENT_COUNT_SHOW);

    commentsToRender.forEach((item) => {
      const comment = createComment(item);
      commentFragment.append(comment);
    });

    shownCommentsCount += commentsToRender.length;

    commentList.append(commentFragment);

    const commentShownCount = document.querySelector('.social__comment-shown-count').textContent = shownCommentsCount;
    const commentTotalCount = document.querySelector('.social__comment-total-count').textContent = comments.length;

    if (commentShownCount === commentTotalCount) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  onCommentsLoaderClick();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { renderComments };

