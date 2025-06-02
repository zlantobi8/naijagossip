document.addEventListener('DOMContentLoaded', () => {
  const posts = JSON.parse(localStorage.getItem('allPosts')) || [];

  renderAllPosts(posts);
});
const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];

function renderAllPosts(posts) {
  const postsRow = document.getElementById('postsRow');
  postsRow.innerHTML = '';

  posts.forEach((post, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-sm-6';
    colDiv.setAttribute('data-index', index);

    const postWrap = document.createElement('div');
    postWrap.className = 'single-post-wrap style-white';

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';

    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title || "post image";
    thumbDiv.appendChild(img);

    const tagA = document.createElement('a');
    tagA.className = `tag-base ${post.categoryClass}`;
    tagA.href = '#';
    tagA.textContent = post.category;
    thumbDiv.appendChild(tagA);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const titleH6 = document.createElement('h6');
    titleH6.className = 'title';
    const titleLink = document.createElement('a');
   titleLink.href = `/detail.html?slug=${generateSlug(post.title)}`;
    titleLink.textContent = post.title;
    titleH6.appendChild(titleLink);

    const postMetaDiv = document.createElement('div');
    postMetaDiv.className = 'post-meta-single mt-3';
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    const rawDate = post.date;
    const date = new Date(rawDate);

    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')
      }-${date.getFullYear()}`;

    console.log(formatted); // 👉 "06-05-2025"


    li.innerHTML = `<i class="fa fa-clock-o"></i> ${formatted}`;
    ul.appendChild(li);
    postMetaDiv.appendChild(ul);

    detailsDiv.appendChild(titleH6);
    detailsDiv.appendChild(postMetaDiv);

    postWrap.appendChild(thumbDiv);
    postWrap.appendChild(detailsDiv);

    colDiv.appendChild(postWrap);
    postsRow.appendChild(colDiv);
  });

  // Add click behavior
  // Attach click listeners for viewing post
  postsRow.querySelectorAll('[data-index]').forEach(el => {
    const index = el.getAttribute('data-index');
    el.addEventListener('click', () => {
      const post = posts[index];  // Now post is defined properly
      const slug = generateSlug(post.title);
      window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want
    });
  });

}



function generateSlug(title) {
  return title
    .toLowerCase()               // convert to lowercase
    .trim()                     // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '')   // remove all non-word chars except spaces and hyphens
    .replace(/\s+/g, '-')       // replace spaces with hyphens
    .replace(/-+/g, '-');       // replace multiple hyphens with one
}
