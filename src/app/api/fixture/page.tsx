import React from 'react';
import Fixture from '@/components/Fixture';

async function getMatches() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/matches`, {
    next: { revalidate: 60 }, // opcional, ISR
  });

  if (!res.ok) throw new Error('Error al cargar los partidos');
  return res.json();
}

export default async function FixturePage() {
  const matches = await getMatches();
  return <Fixture matches={matches} />;
}
