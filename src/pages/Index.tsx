import { useState, useEffect } from "react";
import { TicketType } from "@/data/conferenceData";
import { TicketModal } from "@/components/conference/SharedComponents";
import HeroAboutProgram from "@/components/conference/HeroAboutProgram";
import SpeakersTeamTickets from "@/components/conference/SpeakersTeamTickets";
import FormsContactsFooter from "@/components/conference/FormsContactsFooter";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketType | null>(null);
  const [speakerFormData, setSpeakerFormData] = useState({ name: "", company: "", role: "", topic: "", description: "", link: "", email: "" });
  const [partnerFormData, setPartnerFormData] = useState({ company: "", name: "", role: "", package: "", email: "", phone: "" });
  const [contactFormData, setContactFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [speakerSent, setSpeakerSent] = useState(false);
  const [partnerSent, setPartnerSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); }
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-golos bg-[#0D0015] text-white min-h-screen">
      {activeTicket && (
        <TicketModal ticket={activeTicket} onClose={() => setActiveTicket(null)} />
      )}

      <HeroAboutProgram
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTrack={activeTrack}
        setActiveTrack={setActiveTrack}
        scrollTo={scrollTo}
      />

      <SpeakersTeamTickets
        setActiveTicket={setActiveTicket}
        scrollTo={scrollTo}
      />

      <FormsContactsFooter
        speakerFormData={speakerFormData}
        setSpeakerFormData={setSpeakerFormData}
        partnerFormData={partnerFormData}
        setPartnerFormData={setPartnerFormData}
        contactFormData={contactFormData}
        setContactFormData={setContactFormData}
        speakerSent={speakerSent}
        setSpeakerSent={setSpeakerSent}
        partnerSent={partnerSent}
        setPartnerSent={setPartnerSent}
        contactSent={contactSent}
        setContactSent={setContactSent}
        scrollTo={scrollTo}
      />
    </div>
  );
}
