const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);
  const newUser = newComment.querySelector('.social__picture');

  newUser.src = avatar;
  newUser.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  const COMMENT_COUNT_SHOW = 5;
  const commentsLoader = document.querySelector('.comments-loader');
  const commentList = document.querySelector('.social__comments');

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

    if (commentShownCount >= commentTotalCount) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  onCommentsLoaderClick();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  return () => {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };
};

export { renderComments };
