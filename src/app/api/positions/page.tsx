import React from 'react';
import PositionsTable from '@/components/PositionsTable';

async function getTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`, {
    next: { revalidate: 60 } // opcional, ISR
  });

  if (!res.ok) throw new Error('Error al cargar los equipos');
  return res.json();
}


export default async function PositionsPage() {
  const teams = await getTeams();
  return <PositionsTable teams={teams} />;
}
