<script>
  import { page } from '$app/stores';

  let year = new Date();
</script>

<div class="main-wrapper">
  <nav class="main-nav">
    <ul>
      <li><a href="/" aria-current={$page.url.pathname === '/'}>Home</a></li>

      <li>
        <div class="dropdown-list">
          <a
            href="/collections/characters"
            aria-current={$page.url.pathname.includes('/collections')}
          >
            Characters
          </a>
        </div>
        <span
          class="dropdown"
          aria-current={$page.url.pathname.includes('/collections')}
        >
          Collections
        </span>
      </li>

      <li>
        <a
          href="/bestiary"
          aria-current={$page.url.pathname.includes('/bestiary')}
        >
          Bestiary
        </a>
      </li>
    </ul>
  </nav>

  <slot />

  <footer style="background-color: #2E2E2E;">
    <span>
      Copyright© {year.getFullYear()} Ben Milton and Questing Beast LLC
    </span>
  </footer>
</div>

<style>
  .main-wrapper {
    display: grid;
    grid-template-rows: 48px 1fr 60px;
    min-width: 320px;
    min-height: 100vh;
  }

  .main-nav {
    padding: 0;
    border-bottom: 2px solid #f96743;
  }

  .main-nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    transition: all 0.3s;
  }

  .main-nav a:hover,
  .dropdown:hover,
  nav span[aria-current='true'],
  nav span[aria-current='true']::after {
    background-color: #f96743;
    color: #2e2e2e;
    border-top-color: #2e2e2e;
  }

  .main-nav a[aria-current='true'] {
    background-color: #f96743;
    color: #2e2e2e;
  }

  .main-nav li {
    position: relative;
    display: flex;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
  }

  span {
    position: relative;
    color: var(--link);
    cursor: pointer;
  }

  .dropdown {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    color: var(--light-shades);
    transition: all 0.3s;
  }

  .dropdown::after {
    content: '';
    display: inline-block;
    height: 0;
    width: 0;
    border-top: 6px solid var(--light-shades);
    border-left: 5px solid rgba(0, 0, 0, 0);
    border-right: 5px solid rgba(0, 0, 0, 0);
    margin-left: 8px;
  }

  .dropdown:hover::after {
    border-top-color: #2e2e2e;
  }

  .dropdown-list {
    position: absolute;
    display: none;
    left: 0;
    top: 100%;
    min-width: 100%;
    background-color: #1a1a1a;
  }

  .dropdown-list:hover + .dropdown,
  .dropdown-list:hover + .dropdown::after {
    background-color: #f96743;
    color: #2e2e2e;
    border-top-color: #2e2e2e;
  }

  nav ul li:hover > .dropdown-list {
    display: block;
  }
</style>
