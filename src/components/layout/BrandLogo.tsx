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
    : "h-10 w-auto max-w-[130px] sm:h-12 sm:max-w-none md:h-14";

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <LogoMark className={`${markSize} flex-shrink-0`} />
    </div>
  );
}