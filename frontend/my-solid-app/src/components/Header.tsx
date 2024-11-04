import { A } from "@solidjs/router";

const Header = () => (
  <div class="place-items-center mt-10">
    <header class="w-1/2 p-4 bg-blue-950 text-white flex justify-between shadow-xl rounded-xl">
      <h1 class="text-lg font-bold">Recipe Book</h1>
      <nav class="flex justify-center">
        <A
          href="/"
          class="mr-4 hover:text-blue-400 transition-all duration-300"
        >
          Home
        </A>
        <A
          class="mr-4 hover:text-blue-400 transition-all duration-300"
          href="/create"
        >
          Create Recipe
        </A>
        <A
          href="/favorites"
          class="hover:text-blue-400 transition-all duration-300"
        >
          Favorite Recipes
        </A>
      </nav>
    </header>
  </div>
);

export default Header;
