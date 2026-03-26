'use client';

import { musicPattern1 } from '@/helpers/music';
import { useEffect } from 'react';

export default function StrudelEmbedded() {
  useEffect(() => {
    import('@strudel/embed');
  }, []);

  return (
    <div>
      <strudel-repl code={musicPattern1} />
    </div>
  );
}
