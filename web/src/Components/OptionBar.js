import { useUser } from '../Logic/UserContext';

function OptionBar() {
  
  return (
    <aside class="options options--top" id="options">
    <div></div>
    <menu class="options__main no-scroll">
        <li>
            <a href="/top" class="">
                destacado
            </a>
        </li>
        <li>
            <a href="/" class="active">
                popular
            </a>
        </li>
        <li>
            <a href="/newest" class="">
                más reciente
            </a>
        </li>
        <li>
            <a href="/active" class="">
                activo
            </a>
        </li>
        <li>
            <a href="/commented" class="">
                comentado
            </a>
        </li>
    </menu>
        <menu>
            <li class="dropdown">
          <button aria-label="Ordenar por tipo" title="Ordenar por tipo"><i class="fa-solid fa-filter"></i> Filter by type</button>
          <ul class="dropdown__menu">
              <li>
                  <a href="/hot/%E2%88%9E/all" class="active">
                      all
                  </a>
              </li>
              <li>
                  <a href="/hot/%E2%88%9E/links" class="">
                      threads
                  </a>
              </li>
              <li>
                  <a href="/hot/%E2%88%9E/articles" class="">
                      links
                  </a>
              </li>
          </ul>
      </li>
    </menu>
  </aside>
  );
}

export default OptionBar;
