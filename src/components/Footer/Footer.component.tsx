import { MapPin, Mountain, Compass, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/images/cpvlLogoVet1.png";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 dark:bg-card/80 border-t border-border text-foreground transition-colors duration-500">
      <div className="container mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & copyright */}
          <div className="space-y-4">
            <img src={logo} alt="CPVL" className="h-21 w-auto bg-white p-2 rounded-sm" />
            <p className="text-sm text-muted-foreground font-body">
              Clube Poçoscaldense de Vôo Livre
            </p>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-foreground/80">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li><a href="#historia" className="hover:text-primary transition-colors">Nossa História</a></li>
              <li><a href="#diretoria" className="hover:text-primary transition-colors">Diretoria</a></li>
              <li><a href="#espaco-aereo" className="hover:text-primary transition-colors">Espaço Aéreo</a></li>
              <li><a href="#estatuto" className="hover:text-primary transition-colors">Estatuto</a></li>
              <li><a href="#regimento" className="hover:text-primary transition-colors">Regimento Interno</a></li>
            </ul>
          </div>

          {/* Rampa */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-foreground/80">
              Rampa
            </h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <a
                  href="https://maps.google.com/?q=-21.7715658,-46.5749861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Mapa
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Mountain size={14} className="text-primary" />
                <span>Altitude: 1480m</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mountain size={14} className="text-primary" />
                <span>Desnível: 400m</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Compass size={14} className="text-primary" />
                <span>S | NE | N | NW</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-foreground/80">
              Mídias Sociais
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2.5 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2.5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Clube Poçoscaldense de Vôo Livre — CPVL
        </div>
      </div>
    </footer>
  );
};
