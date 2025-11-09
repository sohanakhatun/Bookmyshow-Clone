import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">🎬 MovieTime</h2>
          <p className="text-sm text-gray-400">
            Your one-stop destination for movie bookings, trailers, and
            showtimes.
          </p>
          <div className="flex items-center gap-2 mt-3 text-gray-400">
            <MapPin className="w-4 h-4" />
            {localStorage.getItem("currentCity") && (
              <span>{localStorage.getItem("currentCity")},India</span>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Now Showing</li>
            <li>Upcoming Movies</li>
            <li>Offers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-3 mb-4">
            <Button variant="ghost" size="icon">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>

          <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm">
            Subscribe for Updates
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MovieTime. All rights reserved.
      </div>
    </footer>
  );
}
