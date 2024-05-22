import Header from "../Components/Header"

function NotFound() {
  return (
    <div>
      <Header/>
      <main id="main" data-controller="lightbox timeago" class="view-compact">
        <div id="content" class="section section--top section--muted">
          <p>404 Not found</p>
        </div>
      </main>
    </div>
  );
}

export default NotFound