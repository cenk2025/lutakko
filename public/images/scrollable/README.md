# Image sequences

Place your frame sequences here, one folder per category, exactly as referenced
in `data/content.ts`:

```
public/images/scrollable/
├── festivals-culture/   ← 1.webp … 120.webp
├── food-sauna/          ← 1.webp … 120.webp
└── marina-recreation/   ← 1.webp … 120.webp
```

If your existing exports use a different prefix / extension / starting index
(e.g. `ezgif-frame-145.jpg` … `240.jpg`), update the corresponding
category's `framePrefix`, `frameExt`, `frameStart` and `frameCount` in
`data/content.ts` instead of renaming files.
