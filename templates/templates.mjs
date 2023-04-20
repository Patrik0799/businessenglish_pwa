/**
 * @overview HTML templates of ccmjs-based web component for an app collection
 * @author André Kless <andre.kless@web.de> 2022
 */

import { html, render, unsafeHTML } from 'https://ccmjs.github.io/tkless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - ccmjs-based app instance for an app collection
 * @param {Function} onClick - when an entry is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( app, onClick ) {
  return html`
    <header>
      <div id="headline">${ headline( app.title || '' ) }</div>
      <div></div>
      <div class="entry" @click=${ () => onClick() }>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
          </svg>
      </div>
    </header>
    <main></main>
    <footer ?data-hidden=${ !app.footer.length }>
      ${ app.footer.map( ( entry, i ) => html`
        <div class="entry" @click=${ () => onClick( i + 1 ) }>
          <img src="${ entry.icon || app.icon || '' }" ?data-hidden=${ !entry.icon && !app.icon }>
          <div>${ unsafeHTML(entry.title) }</div>
        </div>
      ` ) }
    </footer>
    <footer class="main_footer">
        <img src="./icons/hs-bonn-rhein-sieg.png" alt="HS Bonn Rhein Sieg">
        <img src="./icons/fesb-bg.png" alt="FESB">
        <img src="./icons/university_of_bonn.png" alt="University of Bonn">
    </footer>
  `;
}

/**
 * returns the HTML template for a content behind an entry
 * @param {Object} app - ccmjs-based app instance for an app collection
 * @param {Function} onClick - when an entry is clicked
 * @returns {TemplateResult} main HTML template
 */
export function home( app, onClick ) {
  return html`
    ${ app.sections.map( ( section, i ) => html`
      <div class="section">
        <div class="title">${ section.title }</div>
        <div>
          ${ section.entries.map( ( entry, j ) => app.routing ? html`
            <a class="entry" href="?ccm-${ app.routing.app }=home-${ i + 1 }-${ j + 1 }" @click=${ event => { event.preventDefault(); onClick( i + 1, j + 1 ); } }>
              <img src="${ entry.icon || app.icon || '' }" ?data-invisible=${ !entry.icon && !app.icon }>
              <span>${ entry.title }</span>
            </a>
          ` : html`
            <div class="entry" @click=${ () => onClick( i + 1, j + 1 ) }>
              <img src="${ entry.icon || app.icon || '' }" ?data-invisible=${ !entry.icon && !app.icon }>
              <span>${ unsafeHTML(entry.title) }</span>
            </div>
          ` ) }
        </div>
      </div>
    ` ) }
  `;
}

/**
 * returns the HTML template for the headline
 * @param {string} title - title of the app collection
 * @param {string} [section] - section of the clicked entry
 * @param {string} [entry] - name of the clicked entry
 * @returns {TemplateResult} main HTML template
 */
export function headline( title, section, entry ) {
  if ( section )
    return html`
      <div>
        <div>${ title }</div>
        <div>
          <span ?data-hidden=${ !section }>${ section }</span>
          <span ?data-hidden=${ !entry }> > ${ entry }</span>
        </div>
      </div>
    `;
  else
    return html`<div>${ title }</div>`;
}