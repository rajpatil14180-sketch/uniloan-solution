import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "partners", "opt");
const UA = "Mozilla/5.0 (compatible; UniloanSolution/1.0)";

const PARTNERS = [
  {
    abbr: "sbi",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/33/State_Bank_of_India.svg",
  },
  {
    abbr: "hdfc",
    file: "public/partners/hdfc.svg",
  },
  {
    abbr: "boi",
    file: "public/partners/boi.svg",
  },
  {
    abbr: "pnb",
    file: "public/partners/pnb.svg",
  },
  {
    abbr: "bob",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Bank_of_Baroda_Logo_since_Dec_19.png",
  },
  {
    abbr: "union",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Union_Bank_of_India_Logo.svg",
  },
  {
    abbr: "cbi",
    file: "public/partners/cbi.svg",
  },
  {
    abbr: "icici",
    url: "https://www.icicibank.com/content/dam/icicibank-revamp/images/icici-logo/icici-header-logo.png",
  },
  {
    abbr: "idfc",
    url: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/n1/IDFC-logo-website.svg",
  },
  {
    abbr: "axis",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg",
  },
  {
    abbr: "yes",
    file: "public/partners/yes.svg",
  },
  {
    abbr: "credila",
    url: "https://www.credila.com/images/Credila-Logo.png",
  },
  {
    abbr: "tata",
    file: "public/partners/tata.jpg",
  },
  {
    abbr: "poonawalla",
    file: "public/partners/poonawalla.png",
  },
  {
    abbr: "avanse",
    url: "https://www.avanse.com/viewPagesAssets/vc/avanse-logo.svg",
  },
  {
    abbr: "auxilo",
    url: "https://www.auxilo.com/images/Auxilo_Logo.svg",
  },
  {
    abbr: "incred",
    file: "public/partners/incred.svg",
  },
];

async function loadInput(partner) {
  if (partner.file) {
    const filePath = path.join(ROOT, partner.file);
    return fs.readFileSync(filePath);
  }

  const res = await fetch(partner.url, { headers: { "User-Agent": UA } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${partner.url}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function optimizeLogo(partner) {
  const input = await loadInput(partner);
  const outPath = path.join(OUT_DIR, `${partner.abbr}.png`);

  await sharp(input)
    .resize(240, 96, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(outPath);

  const size = fs.statSync(outPath).size;
  console.log(`OK ${partner.abbr}.png (${size} bytes)`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const partner of PARTNERS) {
  try {
    await optimizeLogo(partner);
  } catch (error) {
    console.error(`FAIL ${partner.abbr}: ${error.message}`);
    process.exitCode = 1;
  }
}
