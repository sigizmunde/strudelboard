export const musicPattern = `
            setcps(1)
            n("<0 1 2 3 4>*8").scale('G4 minor')
            .s("gm_lead_6_voice")
            .clip(sine.range(.2,.8).slow(8))
            .jux(rev)
            .room(2)
            .sometimes(add(note("12")))
            .lpf(perlin.range(200,20000).slow(4))
            `;

export const musicPattern1 =
  '            setcps(1)\n$:          n("<0 1 2 3 4>*8").scale(\'G4 minor\')\n            .s("gm_lead_6_voice")\n            .clip(sine.range(.2,.8).slow(8))\n            .jux(rev)\n            .room(2)\n            .sometimes(add(note("12")))\n            .lpf(perlin.range(200,2000).slow(4))\n            .pan(1)\n$:          n("<0 2 3 4 1>*8").scale(\'G4 minor\')\n            .s("gm_lead_6_voice")\n            .clip(sine.range(.2,.8).slow(8))\n            .jux(rev)\n            .sometimes(add(note("24")))\n            .room(2)\n            .lpf(perlin.range(200,2000).slow(4))\n            .pan(0)';
