// Cache DOM elements once

const newsContainer = document.getElementById('popular-news-list');
const postsRow = document.getElementById('postsRow');
const latestPostsRow = document.getElementById('latest-posts-row');
const politicsPostsRow = document.getElementById('politics-posts-row');
const latestNews = document.getElementById('latestNews');

const query = encodeURIComponent(`{
  "sportsPost": *[_type == "sportsPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "educationPost": *[_type == "educationPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "politicsPost": *[_type == "politicsPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "technologyPost": *[_type == "technologyPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "healthPost": *[_type == "healthPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "celebrityPost": *[_type == "celebrityPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  },
  "mainPost": *[_type == "mainPost"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    categoryClass,
    description,
    author,
    readingTime,
    date
  }
}`);


const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`;

let allPosts = [];
let mainpost1 = []
fetch(url, {
  headers: {
    Authorization: 'Bearer skFVqxDGIrVdfEbrpfCX9ekGY6ROEGyXFnGEXwgYCGdh9d2boyveO7pfLLsvKAbuliqy7HRjYIdUXKasLuzfVIh9GZBdWynB8fSSZLULnsqxbFSkoDm4TVPfLZatx5B1CG8G2Fvtk3L0ozg6ruDKuKHdGljaha0ZAPwZlPrC8rcznmUXj29I'
  }
})
  .then(res => res.json())
  .then(data => {

    const {
      mainPost = [],
      sportsPost = [],
      educationPost = [],
      politicsPost = [],
      technologyPost = [],
      healthPost = [],
      celebrityPost = [],
    } = data.result || {};

    allPosts = [
      ...mainPost,
      ...sportsPost,
      ...educationPost,
      ...politicsPost,
      ...technologyPost,
      ...healthPost,
      ...celebrityPost,
    ];

    function getLatestPost(posts) {
      if (!posts.length) return null;
      // Sort descending by date and pick first
      return posts
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    }

    const latestPolitics = getLatestPost(politicsPost);
    const latestSports = getLatestPost(sportsPost);
    const latestTechnology = getLatestPost(technologyPost);
    const latestCelebrity = getLatestPost(celebrityPost);

    // Filter out any null in case a category is empty
    const mainpost1 = [latestPolitics, latestSports, latestTechnology, latestCelebrity].filter(Boolean);

    const filteredPosts = allPosts.filter(post =>
      post.title && post.title.toLowerCase().includes('sanitary conditions at unical')
    );
    console.log(filteredPosts);


    renderBanner(mainpost1);


    renderMainPosts(mainpost1);
    // renderLatestPosts(latestPosts);

    // renderColumnPosts(thirdColumnPosts);

    renderPosts(sportsPost, 'latest-posts-row')
    renderPosts(politicsPost, 'politics-posts-row');
  })
  .catch(err => console.error('Error fetching Sanity data:', err));


function generateSlug(title) {
  return title
    .toLowerCase()               // convert to lowercase
    .trim()                     // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '')   // remove all non-word chars except spaces and hyphens
    .replace(/\s+/g, '-')       // replace spaces with hyphens
    .replace(/-+/g, '-');       // replace multiple hyphens with one
}


document.getElementById("search-btn").addEventListener("click", performSearch);
document.getElementById("search-input").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    performSearch();
  }

});

function performSearch() {
  const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();

  if (!searchQuery) {
    // When cleared, restore only the original main posts subset
    renderMainPosts(mainpost1);
    latestNews.innerHTML = "Latest News"
    return;
  }

  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery) ||
    (post.category && post.category.toLowerCase().includes(searchQuery))
  );
  latestNews.innerHTML = "Search result"
  if (filtered.length === 0) {
    postsRow.innerHTML = `<p class="text-danger text-center w-100">No results found for "${searchQuery}"</p>`;
    return;
  }

  // Show filtered results (which could be from allPosts) in main container
  renderMainPosts(filtered);
}




document.getElementById("btn2").addEventListener("click", performSearch1);
document.getElementById("form1").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    performSearch1();
  }

});

function performSearch1() {
  const searchQuery = document.getElementById("form1").value.trim().toLowerCase();

  if (!searchQuery) {
    // When cleared, restore only the original main posts subset
    renderMainPosts(mainpost1);

    latestNews.innerHTML = "Latest News"
    return;
  }

  const filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery) ||
    (post.category && post.category.toLowerCase().includes(searchQuery))
  );
  latestNews.innerHTML = "Search result"
  if (filtered.length === 0) {
    postsRow.innerHTML = `<p class="text-danger text-center w-100">No results found for "${searchQuery}"</p>`;
    return;
  }

  // Show filtered results (which could be from allPosts) in main container
  renderMainPosts(filtered);
}















// Popular News with safe text injection
function popularNews1(posts) {
  newsContainer.innerHTML = ''; // clear before adding

  posts.forEach((post, index) => {
    const postWrapper = document.createElement('div');
    postWrapper.className = 'single-post-list-wrap style-white';
    postWrapper.setAttribute('data-index11', index);

    // Create media div
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'media';

    const mediaLeft = document.createElement('div');
    mediaLeft.className = 'media-left';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title || "news image";
    mediaLeft.appendChild(img);











    const mediaBody = document.createElement('div');
    mediaBody.className = 'media-body';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const postMeta = document.createElement('div');
    postMeta.className = 'post-meta-single';
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    const rawDate = post.date;
    const date = new Date(rawDate);

    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')
      }-${date.getFullYear()}`;





    li.innerHTML = `<i class="fa fa-clock-o"></i> ${formatted}`;
    ul.appendChild(li);
    postMeta.appendChild(ul);

    const titleH6 = document.createElement('h6');
    titleH6.className = 'title';
    const titleLink = document.createElement('a');
    titleLink.href = `/detail.html?slug=${generateSlug(post.title)}`;
    titleLink.textContent = post.title;
    titleH6.appendChild(titleLink);

    detailsDiv.appendChild(postMeta);
    detailsDiv.appendChild(titleH6);

    mediaBody.appendChild(detailsDiv);

    mediaDiv.appendChild(mediaLeft);
    mediaDiv.appendChild(mediaBody);

    postWrapper.appendChild(mediaDiv);

    // Add click event to the whole post block
    postWrapper.addEventListener('click', () => {
      const slug = generateSlug(post.title);
      window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want
    });

    newsContainer.appendChild(postWrapper);
  });
}



function renderMainPosts(posts) {
  postsRow.innerHTML = ''; // Clear existing posts

  const visiblePosts = posts.slice(0, 5); // Show only first 5 posts

  visiblePosts.forEach((post, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-sm-6';
    colDiv.setAttribute('data-index', index);

    const postWrap = document.createElement('div');
    postWrap.className = 'single-post-wrap style-white';

    // Image container
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title || "main post image";
    thumbDiv.appendChild(img);

    // Category tag
    const tagA = document.createElement('a');
    tagA.className = `tag-base ${post.categoryClass} `;
    tagA.href = '#';
    tagA.textContent = post.category;
    thumbDiv.appendChild(tagA);

    // Post details
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





    li.innerHTML = `<i class="fa fa-clock-o"></i> ${formatted}`;
    ul.appendChild(li);
    postMetaDiv.appendChild(ul);

    detailsDiv.appendChild(titleH6);
    detailsDiv.appendChild(postMetaDiv);

    // Combine and attach
    postWrap.appendChild(thumbDiv);
    postWrap.appendChild(detailsDiv);
    colDiv.appendChild(postWrap);
    postsRow.appendChild(colDiv);
  });

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

const navbtn11 = document.getElementById('god12');
function renderPosts(posts, containerId) {

  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }
  container.innerHTML = ''; // Clear previous posts
  const postsToRender = posts.slice(0, 8);
  postsToRender.forEach(post => {
    navbtn11.addEventListener('click', async () => {



      const slug = generateSlug(post.category);
      window.location.href = `/all-posts.html?slug=${slug}`;


    });
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-sm-6';

    const postWrap = document.createElement('div');
    postWrap.className = 'single-post-wrap';

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';

    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title || "column post image";
    thumbDiv.appendChild(img);

    const btnDateP = document.createElement('p');
    btnDateP.className = 'btn-date';

    const date = new Date(post.date);
    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    btnDateP.innerHTML = `<i class="fa fa-clock-o"></i> ${formatted}`;
    thumbDiv.appendChild(btnDateP);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const titleH6 = document.createElement('h6');
    titleH6.className = 'title';

    const titleLink = document.createElement('a');
    titleLink.href = `/detail.html?slug=${generateSlug(post.title)}`;
    titleLink.textContent = post.title;
    titleH6.appendChild(titleLink);

    detailsDiv.appendChild(titleH6);

    postWrap.appendChild(thumbDiv);
    postWrap.appendChild(detailsDiv);

    postWrap.addEventListener('click', () => {
      const slug = generateSlug(post.title);
      window.location.href = `/detail.html?slug=${slug}`;
    });

    col.appendChild(postWrap);
    container.appendChild(col);

  });






}


function viewPost(post) {
  localStorage.setItem('selectedPost', JSON.stringify(post));

  const related = allPosts.filter(p =>
    p.category === post.category
  );

  localStorage.setItem('relatedPost', JSON.stringify(related));
  window.location.href = '/detail.html';
}


async function renderBanner(slicepost) {
  let randomAdsession = sessionStorage.getItem('randomAdsession')
  if (randomAdsession == null) {
    randomAdsession = Math.floor(Math.random() * slicepost.length);
    sessionStorage.setItem('randomAdsession', randomAdsession)
  } else {
    randomAdsession = parseInt(randomAdsession, 10)
  }

  const adimg = document.getElementById('adimg')
  adimg.src = slicepost[randomAdsession].image
  const categoryClass = document.getElementById('categoryClass')
  categoryClass.className = `tag-base ${slicepost[randomAdsession].categoryClass}`
  const adTitle = document.getElementById('adTitle')
  categoryClass.innerHTML = slicepost[randomAdsession].category
  adTitle.innerHTML = slicepost[randomAdsession].title
  const asDescription = document.getElementById('asDescription');
  asDescription.innerHTML = `${slicepost[randomAdsession].description.slice(0, 200)} .....`


  const rawDate = slicepost[randomAdsession].date;
  const date = new Date(rawDate);

  const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')
    }-${date.getFullYear()}`;




  document.getElementById('adDate').innerHTML = formatted;

  document.getElementById('adButton').addEventListener('click', (() => {
    const slug = generateSlug(slicepost[randomAdsession].title);
    window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want
  }))
}

const today = new Date();

const options = { weekday: 'long', month: 'long', day: 'numeric' };
const formatted = today.toLocaleDateString(undefined, options);


const lateDate = document.getElementById('lateDate').innerHTML = formatted