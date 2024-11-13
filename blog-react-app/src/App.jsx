import Header from './components/Header'
import BlogList from './components/BlogList/BlogList.jsx';
import { posts } from './data/posts';
import './App.css';
import PostEditor from "./components/PostEditor/PostEditor.jsx";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={posts} />
        <PostEditor />
        {/* <TagInput /> */}
      </main>
    </div>
  );
}

export default App;
