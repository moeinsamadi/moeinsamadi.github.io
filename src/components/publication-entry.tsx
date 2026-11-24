import { publications } from "@/data/publications";
import type { Publication } from "@/types/publications";

/** Title, highlighted author list and venue of one publication. */
export function PublicationEntry({
  pub,
  authorName = publications.authorName,
}: {
  pub: Publication;
  authorName?: string;
}) {
  const authors = pub.authors.split(", ");

  return (
    <>
      {pub.link ? (
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-base/4 font-semibold hover:underline underline-offset-4"
        >
          {pub.title}
        </a>
      ) : (
        <span className="text-base text-base/4 font-semibold">{pub.title}</span>
      )}

      <div className="text-sm leading-4.5 text-muted-foreground mt-1">
        {authors.map((author, i) => (
          <span
            key={i}
            className={
              author.replace(/\*+$/, "") === authorName ? "font-semibold" : ""
            }
          >
            {author}
            {i < authors.length - 1 && ", "}
          </span>
        ))}
      </div>

      <div className="text-sm italic leading-4.5 text-muted-foreground">
        {pub.venue}
      </div>
    </>
  );
}
