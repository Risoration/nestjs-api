'use client';
import { useState } from 'react';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  return <main>{error && <p>{error}</p>}</main>;
}
