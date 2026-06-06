type BrandLogoSize = "header" | "footer";

interface BrandLogoProps {
  size?: BrandLogoSize;
  className?: string;
}

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Uniloan Logo"
      className={`${className} object-contain`}
    />
  );
}

export function BrandLogo({
  size = "header",
  className = "",
}: BrandLogoProps) {
  const markSize =
  size === "footer"
    ? "h-16 w-auto sm:h-20"
    : "h-12 w-auto sm:h-14 md:h-16";

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <LogoMark className={`${markSize} flex-shrink-0`} />
    </div>
  );
}