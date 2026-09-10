interface LegalSection {
  heading: string;
  paragraphs: string[];
}

/**
 * Formato leve editado pelo admin: linhas "## Título" iniciam uma seção,
 * parágrafos separados por linha em branco.
 */
export function parseLegalBody(body: string): LegalSection[] {
  const sections: LegalSection[] = [];
  let current: LegalSection | null = null;

  for (const block of body.split("\n\n")) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      current = { heading: trimmed.slice(3).trim(), paragraphs: [] };
      sections.push(current);
    } else if (current) {
      current.paragraphs.push(trimmed);
    } else {
      current = { heading: "", paragraphs: [trimmed] };
      sections.push(current);
    }
  }

  return sections;
}

export function LegalContent({ body, updatedAt }: { body: string; updatedAt: string }) {
  const sections = parseLegalBody(body);

  return (
    <main className="flex-1 bg-lux-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs tracking-widest text-lux-brown/60 uppercase">
          Última atualização: {updatedAt}
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-serif text-xl text-lux-deep">{section.heading}</h2>
              )}
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-lux-brown">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
