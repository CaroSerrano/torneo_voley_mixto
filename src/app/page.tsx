import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PositionsPage from './api/positions/page';
import FixturePage from './api/fixture/page';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section id='positions'>
          <PositionsPage />
        </section>
        <section id='fixture'>
          <FixturePage />
        </section>
      </main>
      <Footer />
    </div>
  );
}
