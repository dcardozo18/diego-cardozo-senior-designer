
const Footer = ({ dictionary }: { dictionary: any }) => {
  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-6 md:px-6">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {dictionary.footer.copy}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
