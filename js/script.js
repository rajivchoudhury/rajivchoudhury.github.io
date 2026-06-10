/*
=========================================================
Rajiv Choudhury Portfolio
js/script.js
=========================================================
*/

/* =========================================================
   Generic JSON Loader
========================================================= */

async function fetchJson(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }

    return await response.json();
}

/* =========================================================
   Summary
========================================================= */

async function loadSummary() {
    const container = document.getElementById("summary-content");

    try {
        const data = await fetchJson("./res/summary.json");

        container.innerHTML = `
            <h1>${data.title || "About Me"}</h1>

            ${(data.paragraphs || [])
                .map(paragraph => `<p>${paragraph}</p>`)
                .join("")}
        `;
    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <h1>About Me</h1>
            <p>Unable to load summary information.</p>
        `;
    }
}

/* =========================================================
   Experience
========================================================= */

async function loadExperience() {
    const container = document.getElementById("experience-content");

    try {
        const experiences = await fetchJson("./res/experience.json");

        container.innerHTML = experiences
            .map(exp => `
                <div class="card">

                    <div class="card-header">
                        <h4>${exp.role || ""}</h4>
                        <span class="date">
                            ${exp.duration || ""}
                        </span>
                    </div>

                    <p class="subtitle">
                        ${exp.organization || ""}
                    </p>

                    <p>
                        ${exp.description || ""}
                    </p>

                </div>
            `)
            .join("");

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <div class="card">
                <p>Unable to load experience data.</p>
            </div>
        `;
    }
}

/* =========================================================
   Education
========================================================= */

async function loadEducation() {
    const container = document.getElementById("education-content");

    try {
        const education = await fetchJson("./res/education.json");

        container.innerHTML = education
            .map(item => `
                <div class="card">

                    <div class="card-header">
                        <h4>${item.institute || ""}</h4>

                        <span class="date">
                            ${item.duration || ""}
                        </span>
                    </div>

                    <p class="subtitle">
                        ${item.degree || ""}
                    </p>

                    <p>
                        ${item.description || ""}
                    </p>

                </div>
            `)
            .join("");

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <div class="card">
                <p>Unable to load education data.</p>
            </div>
        `;
    }
}

/* =========================================================
   Blogs
========================================================= */

async function loadBlogs(path, targetId) {

    const container =
        document.getElementById(targetId);

    try {

        const blogs =
            await fetchJson(path);

        if (!blogs.length) {

            container.innerHTML = `
                <p class="empty-message">
                    No posts available.
                </p>
            `;

            return;
        }

        container.innerHTML =
            blogs.map(blog => {

                const images =
                    Array.isArray(blog.Images)
                        ? blog.Images
                        : [];

                const imageGallery =
                    images.length > 0
                        ? `
                            <div class="blog-gallery">

                                ${images.map(image => `
                                    <img
                                        src="${image}"
                                        alt="${blog.title}"
                                        class="blog-image">
                                `).join("")}

                            </div>
                          `
                        : "";

                return `
                    <div class="card blog-card">

                        <h3>
                            ${blog.title || ""}
                        </h3>

                        <span class="blog-date">
                            ${blog.date || ""}
                        </span>

                        ${imageGallery}

                        <p class="card-description">
                            ${blog.description || ""}
                        </p>

                        ${
                            blog.link
                                ? `
                                    <a
                                        href="${blog.link}"
                                        target="_blank"
                                        class="text-link">
                                        Read More
                                    </a>
                                  `
                                : ""
                        }

                    </div>
                `;

            }).join("");

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="empty-message">
                Unable to load blog posts.
            </p>
        `;
    }
}

/* =========================================================
   BibTeX Parser
========================================================= */

function parseBibTeX(bibText) {

    const entries = [];

    const entryRegex =
        /@([^{\s]+)\s*\{\s*([^,]+),([\s\S]*?)\n\s*\}\s*/gm;

    let match;

    while ((match = entryRegex.exec(bibText)) !== null) {

        const entry = {
            type: match[1].trim(),
            key: match[2].trim()
        };

        const fieldsRaw = match[3];

        const fieldRegex =
            /([a-zA-Z]+)\s*=\s*[{"]([\s\S]*?)[}"]\s*,?/g;

        let fieldMatch;

        while ((fieldMatch = fieldRegex.exec(fieldsRaw)) !== null) {

            entry[fieldMatch[1].toLowerCase()] =
                fieldMatch[2]
                    .trim()
                    .replace(/\s+/g, " ");
        }

        entries.push(entry);
    }

    return entries;
}

/* =========================================================
   Publications
========================================================= */

async function loadPublications() {

    const container =
        document.getElementById("publication-list");

    try {

        const response =
            await fetch("./data/citations.bib");

        if (!response.ok) {
            throw new Error(
                "Unable to fetch citations.bib"
            );
        }

        const bibText =
            await response.text();

        const publications =
            parseBibTeX(bibText);

        if (!publications.length) {

            container.innerHTML = `
                <div class="card">
                    <p>
                        No publications found.
                    </p>
                </div>
            `;

            return;
        }

        renderPublications(publications);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="card">
                <p>
                    Unable to load publications.
                </p>
            </div>
        `;
    }
}

function renderPublications(publications) {

    const container =
        document.getElementById("publication-list");

    container.innerHTML =
        publications
            .map(pub => {

                const title =
                    pub.title ||
                    "Untitled Publication";

                const authors =
                    pub.author ||
                    "Unknown Authors";

                const venue =
                    pub.booktitle ||
                    pub.journal ||
                    "";

                const year =
                    pub.year ||
                    "";

                const abstract =
                    pub.abstract ||
                    pub.note ||
                    "";

                const url =
                    pub.url
                        ? `
                        <a
                            href="${pub.url}"
                            target="_blank"
                            class="text-link publication-link">
                            View Publication
                        </a>
                        `
                        : "";

                return `
                    <div class="card">

                        <div class="card-header">

                            <h4>
                                ${title}
                            </h4>

                            <span class="date">
                                ${year}
                            </span>

                        </div>

                        <p class="subtitle publication-authors">
                            ${authors}
                        </p>

                        <p class="publication-venue">
                            <em>${venue}</em>
                        </p>

                        ${
                            abstract
                                ? `
                                <p class="publication-abstract">
                                    ${abstract}
                                </p>
                                `
                                : ""
                        }

                        ${url}

                    </div>
                `;
            })
            .join("");
}

/* =========================================================
   Navigation
========================================================= */

function initializeNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".page-section");

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const targetId =
                    item.dataset.target;

                navItems.forEach(nav =>
                    nav.classList.remove("active")
                );

                sections.forEach(section =>
                    section.classList.remove("active")
                );

                item.classList.add("active");

                const targetSection =
                    document.getElementById(targetId);

                if (targetSection) {

                    targetSection.classList.add("active");

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            }
        );
    });
}

/* =========================================================
   Initial Load
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        initializeNavigation();
        initializeMobileMenu();

        await Promise.all([

            loadProfile(),

            loadSummary(),

            loadExperience(),

            loadEducation(),

            loadPublications(),

            loadBlogs(
                "./res/tech-blogs.json",
                "tech-blogs-content"
            ),

            loadBlogs(
                "./res/travel-blogs.json",
                "travel-blogs-content"
            )
        ]);
    }
);

async function loadProfile() {

    const profile =
        await fetchJson("./res/profile.json");

    document.title =
        `${profile.name} | Portfolio`;

    const container =
        document.getElementById(
            "profile-container"
        );

    container.innerHTML = `
        

        <div class="profile-container">

            <img
                src="${profile.image}"
                alt="${profile.name}"
                class="profile-img">

            <h2>${profile.name}</h2>

            <p class="role">
                ${profile.role}
            </p>

            <div class="social-links">

                ${profile.socials
                    .map(link => `
                        <a
                            href="${link.url}"
                            target="_blank"
                            class="text-link">
                            ${link.name}
                        </a>
                    `)
                    .join(" · ")}

            </div>

        </div>
    `;
    
    const mobileSummaryProfile =
        document.getElementById(
            "mobile-summary-profile"
        );
    if (mobileSummaryProfile) {
        mobileSummaryProfile.innerHTML = `
            <div class="profile-container">
                <img
                    src="${profile.image}"
                    alt="${profile.name}"
                    class="profile-img">
                <h2>${profile.name}</h2>
                <p class="role">
                    ${profile.role}
                </p>
                <div class="social-links">
                    ${profile.socials
                        .map(link => `
                            <a
                                href="${link.url}"
                                target="_blank"
                                class="text-link">
                                ${link.name}
                            </a>
                        `)
                        .join(" · ")}
                </div>
            </div>
        `;
    }

    loadResume(profile.resume);
};

function loadResume(pdfPath) {

    const container =
        document.getElementById(
            "cv-content"
        );

    container.innerHTML = `

        <p>

            If the PDF does not load,
            you can

            <a
                href="${pdfPath}"
                target="_blank"
                class="text-link">

                download it here

            </a>.

        </p>

        <iframe
            src="${pdfPath}#toolbar=0&navpanes=0&scrollbar=1"
            class="pdf-viewer">
        </iframe>
    `;
}

function initializeMobileMenu() {

    const menuBtn =
        document.getElementById(
            "mobile-menu-btn"
        );

    const overlay =
        document.getElementById(
            "mobile-nav-overlay"
        );

    const closeBtn =
        document.getElementById(
            "close-mobile-nav"
        );

    if (!menuBtn) {
        return;
    }

    menuBtn.addEventListener(
        "click",
        () => {

            overlay.classList.add("open");
        }
    );

    closeBtn.addEventListener(
        "click",
        () => {

            overlay.classList.remove("open");
        }
    );

    document
        .querySelectorAll(
            ".mobile-nav-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const target =
                        item.dataset.target;

                    document
                        .querySelector(
                            `.nav-item[data-target="${target}"]`
                        )
                        ?.click();

                    overlay.classList.remove(
                        "open"
                    );
                }
            );
        });
}