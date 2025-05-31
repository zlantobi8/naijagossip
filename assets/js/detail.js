const post = JSON.parse(localStorage.getItem('selectedPost') || '{}');
const relatedPostsRow = document.getElementById('relatedPostsRow');
const relatedPost = JSON.parse(localStorage.getItem('relatedPost') || '[]');

if (post && post.title) {
    document.getElementById('newsTitle').textContent = post.title;
    document.getElementById('newsDate').textContent = post.date || '--';
    document.getElementById('newsAuthor').textContent = post.author || 'Anonymous';
    document.getElementById('newsCategory').textContent = post.category || 'General';
    document.getElementById('newsImage').src = post.image || 'assets/img/placeholder.png';

    const desc = post.description
        ? `<p>${post.description}</p>`
        : '<p>No description available.</p>';
    document.getElementById('newsContent').innerHTML = desc;

    document.getElementById('newsAuthorLine').textContent =
        `Written by ${post.author || 'Anonymous'}`;
} else {
    document.getElementById('newsTitle').textContent = 'Article Not Found';
    document.getElementById('newsContent').innerHTML =
        '<p>We couldn’t retrieve the article you were looking for.</p>';
}

// Filter out the current post from related posts
const filteredRelatedPosts = relatedPost.filter(rp => rp.title !== post.title);

filteredRelatedPosts.forEach(related => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-12 mb-4';

    const card = document.createElement('div');
    card.className = 'my-related-card p-2';

    const thumb = document.createElement('div');
    thumb.className = 'my-related-thumb';

    const img = document.createElement('img');
    img.src = related.image || 'assets/img/placeholder.png';
    img.alt = related.title || "Related Post";

    const tag = document.createElement('a');
    tag.className = `my-related-tag ${related.categoryClass || 'bg-secondary'}`;
    tag.href = '#';
    tag.textContent = related.category || 'General';

    thumb.appendChild(img);
    thumb.appendChild(tag);

    const details = document.createElement('div');
    details.className = 'my-related-details';

    const title = document.createElement('h6');
    title.className = 'my-related-title';
    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = related.title;
    title.appendChild(titleLink);

    const meta = document.createElement('div');
    meta.className = 'my-related-meta';
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.innerHTML = `<i class="fa fa-clock-o"></i> ${related.date || ''}`;
    ul.appendChild(li);
    meta.appendChild(ul);

    details.appendChild(title);
    details.appendChild(meta);

    card.appendChild(thumb);
    card.appendChild(details);
    col.appendChild(card);
    relatedPostsRow.appendChild(col);

    col.addEventListener('click', () => {
        localStorage.setItem('selectedPost', JSON.stringify(related));
        window.location.href = '/detail.html';
    });
});
