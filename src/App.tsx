import InfiniteMenu from './components/InfiniteMenu';
import content from './content.json';

const App = () => {
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <InfiniteMenu items={content.infiniteMenuItems} />
    </div>
  );
};

export default App;