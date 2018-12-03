import { FormatError } from "./FormatError";

/**
 * Gets the Github.com URL for a URL of a page published via Github Pages.
 * @param url Github Pages URL. If omitted, location.href will be used.
 * @throws {FormatError}
 */
export function ghPagesToGithubUrl(url: string = location.href) {
  const re = /https?\:\/\/([^\.]+)\.github.io\/([^\/]+)/i;
  const match = url.match(re);
  if (!match) {
    throw new FormatError(url, re);
  }

  const [, owner, project] = match;
  return `https://www.github.com/${owner}/${project}`;
}

/**
 * Converts a GitHub repository page URL into a Github Pages URL.
 * (Does not check to see if URL actually exists.)
 * @param url Github repository URL. If omitted, location.href will be used.
 * @throws {FormatError}
 */
export function githubToGHPagesUrl(url: string = location.href) {
  const re = /https?\:\/\/www.github.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(re);
  if (!match) {
    throw new FormatError(url, re);
  }

  const [, owner, project] = match;
  return `https://${owner}.github.io/${project}`;
}

/**
 * Creates a link to the source code on Github for a Github Pages page.
 * (Does not check to see if URL actually exists.)
 * @param url Github repository URL. If omitted and page is hosted on Github Pages, the GitHub project URL will be automatically detected.
 * @returns An anchor (a) element that will link to a GitHub project. The anchor element will be labelled with a span element.
 * The anchor has the class "github-link" and the child span will have the class "github-link__label" (following BEM convention).
 */
export function createSourceLink(url?: string) {
  url = url || ghPagesToGithubUrl();

  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "nofollow";

  const span = document.createElement("span");
  span.textContent = "Source on GitHub";

  a.classList.add("github-link");
  span.classList.add("github-link__label");

  a.appendChild(span);

  return a;
}
