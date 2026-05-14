export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We moved the centering and background logic here!
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <main className="w-full max-w-md">
        {children}
      </main>
    </div>
  );
}