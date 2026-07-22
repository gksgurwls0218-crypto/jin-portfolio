// Root pass-through. The real <html>/<body> shell lives in app/[locale]/layout.tsx
// so the lang attribute and metadata can follow the active locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
