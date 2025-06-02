const query1 = encodeURIComponent(`{
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
  },
  "popularNews": *[_type == "popularNews"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    date
  }
}`);

const url = `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production?query=${query1}`;

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

function getSlugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

const slug = getSlugFromUrl();

fetch(url, {
    headers: {
        Authorization: 'Bearer skFVqxDGIrVdfEbrpfCX9ekGY6ROEGyXFnGEXwgYCGdh9d2boyveO7pfLLsvKAbuliqy7HRjYIdUXKasLuzfVIh9GZBdWynB8fSSZLULnsqxbFSkoDm4TVPfLZatx5B1CG8G2Fvtk3L0ozg6ruDKuKHdGljaha0ZAPwZlPrC8rcznmUXj29I'
    }
})
    .then(res => res.json())
    .then(data => {
        const { mainPosts, latestPosts, secondColumnPosts, thirdColumnPosts, trendingPosts, popularNews } = data.result;
        const allPosts = [...mainPosts, ...latestPosts, ...secondColumnPosts, ...thirdColumnPosts, ...trendingPosts, ...popularNews];

        if (!slug) {
            document.getElementById('newsTitle').textContent = 'No article specified';
            document.getElementById('newsContent').innerHTML = '<p>Please provide an article slug in the URL.</p>';
            return;
        }

        // Find post by matching slug generated from title
        const post = allPosts.find(p => slugify(p.title) === slug);

        if (!post) {
            document.getElementById('newsTitle').textContent = 'Article Not Found';
            document.getElementById('newsContent').innerHTML = '<p>We couldn’t retrieve the article you were looking for.</p>';
            return;
        }

        // Render main post
        document.getElementById('newsTitle').textContent = post.title;
        document.getElementById('newsDate').textContent = post.date || '--';
        document.getElementById('newsAuthor').textContent = post.author || 'Anonymous';
        document.getElementById('newsCategory').textContent = post.category || 'General';
        document.getElementById('newsImage').src = post.image || 'assets/img/placeholder.png';
        document.getElementById('newsContent').innerHTML = post.description ? `<p>${post.description}</p>` : '<p>No description available.</p>';
        document.getElementById('newsAuthorLine').textContent = `Written by ${post.author || 'Anonymous'}`;

        // Render related posts (filter out current)
        // Render related posts (filter out current)
        const relatedPostsRow = document.getElementById('relatedPostsRow');
        relatedPostsRow.innerHTML = '';

        const relatedPosts = allPosts
            .filter(p => slugify(p.title) !== slug && p.category === post.category)
            .slice(0, 6);


        relatedPosts.forEach(related => {
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
            titleLink.href = `/detail.html?slug=${slugify(related.title)}`;
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
                window.location.href = `/detail.html?slug=${slugify(related.title)}`;
            });
        });
    })
    .catch(err => {
        document.getElementById('newsTitle').textContent = 'Error loading article';
        document.getElementById('newsContent').innerHTML = `<p>${err.message}</p>`;
    });
