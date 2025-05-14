'use client'

import PositionsPage from './api/positions/page';
import FixturePage from './api/fixture/page';
import { useEffect, useState } from 'react';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const fetchTeams = async () => {
    const res = await fetch('/api/teams');
    const data = await res.json();
    setTeams(data);
  };

  const fetchMatches = async () => {
    const res = await fetch('/api/matches');
    const data = await res.json();
    setMatches(data);
  };

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);
  return (
    <div>
      <main style={{ paddingTop: '80px' }}>
        <section id='positions'>
          <PositionsPage
            teams={teams}
            refreshMatches={fetchMatches}
            refreshTeams={fetchTeams}
          />
        </section>
        <section id='fixture'>
          <FixturePage matches={matches} refreshMatches={fetchMatches} />
        </section>
      </main>
    </div>
  );
}
