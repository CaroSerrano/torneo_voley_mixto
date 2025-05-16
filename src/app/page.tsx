'use client';

import PositionsPage from './api/positions/page';
import FixturePage from './api/fixture/page';

export default function Home() {
  return (
    <div>
      <main style={{ paddingTop: '80px' }}>
        <section id='positions'>
          <PositionsPage />
        </section>
        <section id='fixture'>
          <FixturePage />
        </section>
      </main>
    </div>
  );
}
