//import { useUser } from '../Logic/UserContext';

function OptionBar({ setOrderState, setFilterState }) {
  
    return (
        <aside className="options options--top" id="options">
          <menu className="options__main no-scroll">
            <li>
              <button onClick={() => setOrderState('top')} className="option-button">
                Top
              </button>
            </li>
            <li>
              <button onClick={() => setOrderState('recent')} className="option-button">
                Recent
              </button>
            </li>
            <li>
              <button onClick={() => setOrderState('commented')} className="option-button">
                Commented
              </button>
            </li>
          </menu>
          <menu>
            <li className="dropdown">
              <button aria-label="Ordenar por tipo" title="Ordenar por tipo">
                <i className="fa-solid fa-filter"></i> Filter by type
              </button>
              <ul className="dropdown__menu">
                <li>
                  <button onClick={() => setFilterState('all')} className="active">
                    all
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilterState('threads')} className="">
                    threads
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilterState('links')} className="">
                    links
                  </button>
                </li>
              </ul>
            </li>
          </menu>
        </aside>
      );
    }

export default OptionBar;
