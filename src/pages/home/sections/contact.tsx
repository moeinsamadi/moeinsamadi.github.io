import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";

export default function ContactSection() {
  return (
    <div className="text-center space-y-5 py-6">
      <h2 className="text-3xl font-semibold relative pb-3 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-12 after:h-[3px] after:rounded after:bg-primary">
        {contact.title}
      </h2>
      <p className="text-lg max-w-xl mx-auto">{contact.text}</p>
      <div>
        <Button asChild size="lg" className="rounded-full px-6">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </Button>
      </div>
      <p
        className="text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: contact.address }}
      />
    </div>
  );
}
