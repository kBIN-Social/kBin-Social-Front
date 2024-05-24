import Header from "../Components/Header"

function NotFound() {
  return (
    <div>
      <Header/>
      <main id="main" data-controller="lightbox timeago" className="view-compact">
        <div id="content" className="section section--top section--muted">
          <p>404 Not found</p>
        </div>
      </main>
    </div>
  );
}

export default NotFound