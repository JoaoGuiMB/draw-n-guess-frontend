interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return <main className="h-screen w-screen bg-nord-10">{children}</main>;
}