import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground bottom-2 w-full text-center text-sm">
      © {new Date().getFullYear()} QuestionApp. All rights reserved.
      <Button variant="link" className="p-0" asChild>
        <a href="https://michalskolak.vercel.app/">Fahmi Hidayah</a>
      </Button>
    </footer>
  );
};
