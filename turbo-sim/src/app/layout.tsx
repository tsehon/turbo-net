export const metadata = {
  title: 'Turbo Sim',
  description: 'Driving simulator for the Turbo Net project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
