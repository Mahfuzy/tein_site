import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--ndc-black)] text-white">
      {/* Bold red accent line at top */}
      <div className="h-1 bg-[var(--ndc-red-primary)]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mb-10">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/tein-logo.jpg"
                alt="TEIN Logo"
                className="h-14 w-14 rounded-sm object-cover ring-2 ring-[var(--ndc-red-primary)]"
              />
              <h3 className="font-extrabold text-xl text-white uppercase tracking-tight">TEIN</h3>
            </div>
            <p className="text-sm text-[var(--ndc-gray-light)] leading-relaxed font-medium">
              Official student wing of the National Democratic Congress, organizing tertiary students across Ghana for political action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">Quick Links</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="#about" className="text-[var(--ndc-gray-light)] hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">About TEIN</Link>
              <Link href="/dashboard/activities" className="text-[var(--ndc-gray-light)] hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">Activities</Link>
              <Link href="/dashboard/executives" className="text-[var(--ndc-gray-light)] hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">Executives</Link>
              <Link href="/register" className="text-[var(--ndc-gray-light)] hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">Join Us</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">Contact</h3>
            <div className="flex flex-col gap-4 text-sm text-[var(--ndc-gray-light)]">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--ndc-red-primary)]" />
                <span className="font-medium">info@teinghana.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[var(--ndc-red-primary)]" />
                <span className="font-medium">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[var(--ndc-red-primary)]" />
                <span className="font-medium">Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">Follow Us</h3>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-sm bg-[var(--ndc-gray-dark)] hover:bg-[var(--ndc-red-primary)] border-2 border-transparent hover:border-[var(--ndc-red-primary)] flex items-center justify-center transition-all"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter/X"
                className="w-11 h-11 rounded-sm bg-[var(--ndc-gray-dark)] hover:bg-[var(--ndc-red-primary)] border-2 border-transparent hover:border-[var(--ndc-red-primary)] flex items-center justify-center transition-all"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 rounded-sm bg-[var(--ndc-gray-dark)] hover:bg-[var(--ndc-red-primary)] border-2 border-transparent hover:border-[var(--ndc-red-primary)] flex items-center justify-center transition-all"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-[var(--ndc-gray-dark)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--ndc-gray-light)]">
          <p className="font-bold uppercase tracking-wide">© 2025 TEIN | Affiliated to the NDC</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--ndc-red-primary)] transition-colors font-bold uppercase tracking-wide">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
