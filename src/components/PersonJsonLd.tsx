// Data terstruktur schema.org "Person": membantu mesin pencari mengenali nama, peran, dan profil luar.
// Tidak tampil di layar; dibaca Google lewat tag <script type="application/ld+json">.
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function PersonJsonLd() {
    const person = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: site.url,
        jobTitle: profile.roles.join(" / "),
        description: profile.tagline,
        homeLocation: { "@type": "Place", name: profile.location },
        alumniOf: profile.education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.school })),
        sameAs: profile.socials.map((link) => link.url),
    };

    return(
        <script
            type="application/ld+json"
            // replace("<") mecegah teks berisi </script> mumutus tag (saran keamanan dokumentasi Next.js)
            dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
    );
}