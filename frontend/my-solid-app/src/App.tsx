import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import { Route, Router } from "@solidjs/router";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage";

const App = () => (
  <Router
    root={(props) => (
      <>
        <Header />
        {props.children}
      </>
    )}
  >
    <Route path="/" component={HomePage} />
    <Route path="/create" component={CreateRecipePage} />
    <Route path="/recipes/:id/edit" component={EditRecipePage} />
    <Route path="/recipes/:id" component={RecipeDetailPage} />
    <Route path="/favorites" component={FavoriteRecipesPage} />
  </Router>
);

export default App;
