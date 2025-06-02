// Cache DOM elements once

const newsContainer = document.getElementById('popular-news-list');
const postsRow = document.getElementById('postsRow');
const latestPostsRow = document.getElementById('latest-posts-row');

const latestNews = document.getElementById('latestNews');

const query = encodeURIComponent(`{
  "mainPosts": *[_type == "mainPost"] | order(date desc) {
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
  "latestPosts": *[_type == "latestPost"] | order(date desc) {
  _id,
  title,
  "image": image.asset->url,
  category,
  description,
  author,
  readingTime,
  date
},
  "secondColumnPosts": *[_type == "secondColumnPost"] | order(date desc) {
  _id,
  title,
  "image": image.asset->url,
  description,
  author,
  readingTime,
  date
},
  "thirdColumnPosts": *[_type == "thirdColumnPost"] | order(date desc) {
  _id,
  title,
  "image": image.asset->url,
  description,
  author,
  readingTime,
  date
},
  "trendingPosts": *[_type == "trendingPost"] | order(date desc) {
  _id,
  title,
  "image": image.asset->url,
  description,
  author,
  readingTime,
  date
}
,
  "popularNews": *[_type == "popularNews"] | order(date desc) {
  _id,
  title,
  "image": image.asset->url,
  date
}
}`);

const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production?query=${query}`;

let allPosts = [];
let mainpost1 = []
fetch(url, {
  headers: {
    Authorization: 'Bearer skFVqxDGIrVdfEbrpfCX9ekGY6ROEGyXFnGEXwgYCGdh9d2boyveO7pfLLsvKAbuliqy7HRjYIdUXKasLuzfVIh9GZBdWynB8fSSZLULnsqxbFSkoDm4TVPfLZatx5B1CG8G2Fvtk3L0ozg6ruDKuKHdGljaha0ZAPwZlPrC8rcznmUXj29I'
  }
})
  .then(res => res.json())
  .then(data => {

    const { mainPosts, latestPosts, secondColumnPosts, thirdColumnPosts, trendingPosts, popularNews } = data.result;
    allPosts = [...mainPosts, ...latestPosts, ...secondColumnPosts, ...thirdColumnPosts, ...trendingPosts, ...popularNews];
    mainpost1 = [...mainPosts];
    const filteredPosts = allPosts.filter(post =>
      post.title && post.title.toLowerCase().includes('sanitary conditions at unical')
    );
    console.log(filteredPosts);

    localStorage.setItem('allPosts', JSON.stringify(allPosts));
    renderBanner(mainPosts);


    renderMainPosts(mainPosts);
    renderLatestPosts(latestPosts);
    renderColumnPosts(secondColumnPosts);
    renderColumnPosts(thirdColumnPosts);
    renderTrending(trendingPosts);
    popularNews1(popularNews);
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


// Render latest posts in a column safely
function renderLatestPosts(posts) {
  latestPostsRow.innerHTML = ''; // clear before adding

  const col = document.createElement('div');
  col.className = 'col-lg-3 col-sm-6';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'single-post-wrap style-overlay-bg';
    postElement.setAttribute('data-index1', index);

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title || "latest post image";
    thumbDiv.appendChild(img);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const postMetaDiv = document.createElement('div');
    postMetaDiv.className = 'post-meta-single mb-3';
    const ul = document.createElement('ul');

    const catLi = document.createElement('li');
    const catLink = document.createElement('a');
    catLink.className = 'tag-base tag-blue';
    catLink.href = '#';
    catLink.textContent = post.category;
    catLi.appendChild(catLink);

    const dateLi = document.createElement('li');
    const dateP = document.createElement('p');


    const rawDate = post.date;
    const date = new Date(rawDate);

    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')
      }-${date.getFullYear()}`;





    dateP.innerHTML = `<i class="fa fa-clock-o"></i> ${formatted}`;
    dateLi.appendChild(dateP);

    ul.appendChild(catLi);
    ul.appendChild(dateLi);
    postMetaDiv.appendChild(ul);

    const titleH6 = document.createElement('h6');
    titleH6.className = 'title';
    const titleLink = document.createElement('a');
    titleLink.href = `/detail.html?slug=${generateSlug(post.title)}`;
    titleLink.textContent = post.title;
    titleH6.appendChild(titleLink);

    detailsDiv.appendChild(postMetaDiv);
    detailsDiv.appendChild(titleH6);

    postElement.appendChild(thumbDiv);
    postElement.appendChild(detailsDiv);

    postElement.addEventListener('click', () => {
      const slug = generateSlug(post[index].title);
      window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want

    });
    col.appendChild(postElement);
  });

  latestPostsRow.appendChild(col);
}

// Reusable renderer for second and third column posts safely
function renderColumnPosts(posts) {
  const col = document.createElement('div');
  col.className = 'col-lg-3 col-sm-6';

  posts.forEach(post => {
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


    const rawDate = post.date;
    const date = new Date(rawDate);

    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')
      }-${date.getFullYear()}`;




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
      const slug = generateSlug(post[index].title);
      window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want
    });

    col.appendChild(postWrap);
  });

  latestPostsRow.appendChild(col);
}

function renderTrending(posts) {
  const col = document.createElement('div');
  col.className = 'col-lg-3 col-sm-6';

  const trendingDiv = document.createElement('div');
  trendingDiv.className = 'trending-post style-box';

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'section-title';
  const titleH6 = document.createElement('h6');
  titleH6.className = 'title';
  titleH6.textContent = 'Trending News';
  sectionTitle.appendChild(titleH6);

  const postSlider = document.createElement('div');
  postSlider.className = 'post-slider owl-carousel';

  // Helper function to chunk posts array into arrays of 4 posts each
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  // chunk posts into groups of 4
  const chunks = chunkArray(posts, 4);

  chunks.forEach((chunk, chunkIndex) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    chunk.forEach((post, index) => {
      const singlePostWrap = document.createElement('div');
      singlePostWrap.className = 'single-post-list-wrap';
      singlePostWrap.setAttribute('data-index11', chunkIndex * 4 + index);

      const mediaDiv = document.createElement('div');
      mediaDiv.className = 'media';

      const mediaLeft = document.createElement('div');
      mediaLeft.className = 'media-left';
      const img = document.createElement('img');
      img.src = post.image;
      img.alt = post.title || "trending post image";
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

      const titleH6Inner = document.createElement('h6');
      titleH6Inner.className = 'title';
      const titleLink = document.createElement('a');
      titleLink.href = `/detail.html?slug=${generateSlug(post.title)}`;
      titleLink.textContent = post.title;
      titleH6Inner.appendChild(titleLink);

      detailsDiv.appendChild(postMeta);
      detailsDiv.appendChild(titleH6Inner);

      mediaBody.appendChild(detailsDiv);

      mediaDiv.appendChild(mediaLeft);
      mediaDiv.appendChild(mediaBody);

      singlePostWrap.appendChild(mediaDiv);

      singlePostWrap.addEventListener('click', () => {

        const slug = generateSlug(post.title);
        window.location.href = `/detail.html?slug=${slug}`; // Use query param or path as you want
      });

      itemDiv.appendChild(singlePostWrap);
    });

    postSlider.appendChild(itemDiv);
  });

  trendingDiv.appendChild(sectionTitle);
  trendingDiv.appendChild(postSlider);
  col.appendChild(trendingDiv);

  latestPostsRow.appendChild(col);

  // Initialize carousel after DOM ready
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 1,          // one group per slide
      loop: false,       // loop or not
      nav: true,
      dots: false,
      autoplay: false,
      margin: 10,
    });
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