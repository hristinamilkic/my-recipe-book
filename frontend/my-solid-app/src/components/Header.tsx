import { A } from "@solidjs/router";

const Header = () => (
  <header class="p-4 bg-blue-950 text-white flex justify-between">
    <h1 class="text-lg font-bold">Recipe Book</h1>
    <nav class="flex justify-center">
      <A href="/" class="mr-4">
        Home
      </A>
      <A href="/create">Create Recipe</A>
    </nav>
  </header>
);

export default Header;
